#!/usr/bin/env python3
# .vscode/plugin/configs.py #
#
# python .vscode/plugin/configs.py

# ~ ~ ~ ~ ~ #

# IMPORTS - IMPLY #
import sys
import json
#
from pathlib import Path
#
sys.dont_write_bytecode = True
#
# IMPORTS - IMPLY #


# VARS - BASIC #
BASE_DIR = Path(".vscode/system/py")
#
JSON_DIR = Path("call/json")
PY_DIR = BASE_DIR
#
http = "http"
https = http + "s://"
#
B_RAW_LINK = https + "raw.githubusercontent.com"
B_API_LINK = https + "api.github.com/repos"
# VARS - BASIC #


# IMPORTS - FETCHINGS #
def load_json(file):
    with open(JSON_DIR / file, encoding="utf-8") as f:
        return json.load(f)
#
pyV = load_json("vars.json")
gitD = load_json("git-data.json")
#
reffAtBr = (f"?ref={gitD["branch"]}")
#
# IMPORTS - FETCHINGS #


# FUNCS - CUSTOMS #
#?
#
def separe_Sects (text):
    lining = (pyV["equal"] * 5)
    bindL = ((lining) + (pyV["space"]))
    bindR = ((pyV["space"]) + (lining))
    #
    return ((bindL) + (text) + (bindR))
#
# FUNCS - CUSTOMS #


# FUNCS - ? #
#?
#
# FUNCS - ? #

# ~ ~ ~ ~ ~ #


#
