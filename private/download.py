from roman_numerals import rint
from requests import get as request
from bs4 import BeautifulSoup as Soup
from concurrent.futures import ThreadPoolExecutor as ThreadPool
from json import dump as json_dump
from re import sub as regex


def _dump_single(id: int) -> dict:
    with request(
        f"https://it.wikisource.org/wiki/Pensieri_(Leopardi)/{rint(id)}"
    ) as response:
        return {
            "id": id,
            "numeral": rint(id).value,
            "text": regex(
                "[\(\[].*?[\)\]]",
                "",
                Soup(response.text, features="lxml")
                .find("div", {"class": "prp-pages-output"})
                .text.replace(f"{rint(id).value}.", "")
                .replace("\n", " "),
            ).strip(),
        }


if __name__ == "__main__":
    with ThreadPool(20) as executor:
        results = {i["id"]: i for i in executor.map(_dump_single, range(1, 112))}

    with open("pensieri.json", "w", encoding="utf-8") as outfile:
        json_dump(results, outfile, ensure_ascii=False, indent=4)
