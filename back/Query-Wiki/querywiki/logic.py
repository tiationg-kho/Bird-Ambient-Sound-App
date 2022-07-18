import wikipedia


def summary(name="War Goddess", length=1):
    try:
        res = wikipedia.summary(name, length)
        return res
    except ValueError:
        return "cannot find"


def search(name):
    try:
        res = wikipedia.search(name)
        if not res:
            raise ValueError()
        return res
    except ValueError:
        return "cannot find"


def suggest(name):
    try:
        res = wikipedia.suggest(name)
        if not res:
            raise ValueError()
        return res
    except ValueError:
        return "cannot find"


def page(name):
    try:
        res = wikipedia.page(name)
        return res
    except ValueError:
        return "cannot find"
