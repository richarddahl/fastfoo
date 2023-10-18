USER_DEFINITIONS = [
    {
        "email": "admin@foobar.com",
        "org_name": "foobar",
        "group_names": ["foobar"],
        "is_superuser": True,
    },
    {
        "email": "user_one@org_one.com",
        "org_name": "org one",
        "group_names": ["group one"],
    },
    {
        "email": "user_two@org_one.com",
        "org_name": "org one",
        "group_names": ["group one", "group two"],
    },
    {
        "email": "user_three@org_two.com",
        "org_name": "org two",
        "group_names": ["group three"],
    },
    {
        "email": "user_four@org_two.com",
        "org_name": "org two",
        "group_names": ["group four"],
    },
]

GROUP_DEFINITIONS = [
    {"name": "foobar"},
    {"name": "group one"},
    {"name": "group two"},
    {"name": "group three"},
    {"name": "group four"},
]

ORGANIZATION_DEFINITIONS = [
    {"name": "foobar"},
    {"name": "org one"},
    {"name": "org two"},
    {"name": "org three"},
    {"name": "org four"},
]
