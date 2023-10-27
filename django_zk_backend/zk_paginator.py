from collections import OrderedDict, namedtuple

from django.core.paginator import InvalidPage
from rest_framework.exceptions import NotFound
import rest_framework.pagination as pagination
from rest_framework.response import Response
from rest_framework.utils.urls import remove_query_param, replace_query_param
from rest_framework.settings import api_settings

PageLink = namedtuple("PageLink", ["url", "number", "is_active", "is_break"])

PAGE_BREAK = PageLink(url=None, number=None, is_active=False, is_break=True)


def _get_displayed_page_numbers(current, final):
    """
    This utility function determines a list of page numbers to display.
    This gives us a nice contextually relevant set of page numbers.

    For example:
    current=14, final=16 -> [1, None, 13, 14, 15, 16]

    This implementation gives one page to each side of the cursor,
    or two pages to the side when the cursor is at the edge, then
    ensures that any breaks between non-continuous page numbers never
    remove only a single page.

    For an alternative implementation which gives two pages to each side of
    the cursor, eg. as in GitHub issue list pagination, see:

    https://gist.github.com/tomchristie/321140cebb1c4a558b15
    """
    assert current >= 1
    assert final >= current

    if final <= 5:
        return list(range(1, final + 1))

    # We always include the first two pages, last two pages, and
    # two pages either side of the current page.
    included = {1, current - 1, current, current + 1, final}

    # If the break would only exclude a single page number then we
    # may as well include the page number instead of the break.
    if current <= 4:
        included.add(2)
        included.add(3)
    if current >= final - 3:
        included.add(final - 1)
        included.add(final - 2)

    # Now sort the page numbers and drop anything outside the limits.
    included = [idx for idx in sorted(included) if 0 < idx <= final]

    # Finally insert any `...` breaks
    if current > 4:
        included.insert(1, None)
    if current < final - 3:
        included.insert(len(included) - 1, None)
    return included


def _get_page_links(page_numbers, current, url_func):
    """
    Given a list of page numbers and `None` page breaks,
    return a list of `PageLink` objects.
    """
    page_links = []
    for page_number in page_numbers:
        if page_number is None:
            page_link = PAGE_BREAK
        else:
            page_link = PageLink(
                url=url_func(page_number),
                number=page_number,
                is_active=(page_number == current),
                is_break=False,
            )
        page_links.append(page_link)
    return page_links


class ZKPagination(pagination.PageNumberPagination):
    total = None

    def paginate_queryset(self, queryset, request, view=None):
        """
        Paginate a queryset if required, either returning a
        page object, or `None` if pagination is not configured for this view.
        """
        self.total = queryset.count()
        page_size = self.get_page_size(request)
        if not page_size:
            return None

        paginator = self.django_paginator_class(queryset, page_size)
        page_number = self.get_page_number(request, paginator)

        try:
            self.page = paginator.page(page_number)
        except InvalidPage as exc:
            msg = self.invalid_page_message.format(
                page_number=page_number, message=str(exc)
            )
            raise NotFound(msg)

        if paginator.num_pages > 1 and self.template is not None:
            # The browsable API should display pagination controls.
            self.display_page_controls = True

        self.request = request
        return list(self.page)

    def get_paginated_response(
        self,
        data,
    ):
        base_url = self.request.build_absolute_uri()

        def page_number_to_url(page_number):
            if page_number == 1:
                return remove_query_param(base_url, self.page_query_param)
            else:
                return replace_query_param(base_url, self.page_query_param, page_number)

        current = self.page.number
        final = self.page.paginator.num_pages
        page_numbers = _get_displayed_page_numbers(current, final)
        page_links_ = _get_page_links(page_numbers, current, page_number_to_url)
        page_links = []
        for page_link in page_links_:
            disabled = False
            if page_link.is_active or page_link.is_break:
                disabled = True
            page_links.append(
                {
                    "href": page_link.url,
                    "text": "..." if page_link.is_break else page_link.number,
                    "variant": "primary" if page_link.is_active else "default",
                    "disabled": disabled,
                }
            )
        # Add the first and last page links to the page links list
        if not self.page.number == 1:
            page_links.append(
                {
                    "href": base_url,
                    "text": "1",
                    "variant": "default",
                }
            )
        last_page_number = self.page.paginator.num_pages
        start = int(self.page.number / api_settings.PAGE_SIZE + 1)
        if start > 0:
            if self.total > api_settings.PAGE_SIZE:
                end = start + api_settings.PAGE_SIZE
            end = self.total
        #return Response(
        return {
                "pagination": {
                    "page_links": page_links,
                    "current_page": self.page.number if data else 0,
                    "num_pages": last_page_number,
                    "start": start,
                    "end": end,
                    "total": self.total,
                },
                "results": data,
            }
