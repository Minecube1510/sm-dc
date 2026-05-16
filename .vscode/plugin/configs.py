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


# VARS - CONFIG #
CONFIG_PATH = Path(__file__).resolve()
    #
PLUGIN_DIR = CONFIG_PATH.parent
VSCODE_DIR = PLUGIN_DIR.parent
ROOT_DIR = VSCODE_DIR.parent
    #
JSON_DIR = ROOT_DIR / "call" / "json"
LCL_PY_DIR = ROOT_DIR / ".vscode" / "system" / "py"
REPO_PY_DIR = LCL_PY_DIR.relative_to(ROOT_DIR)
#
# VARS - CONFIG #


# IMPORTS - FETCHINGS #
def load_json(file):
    with open(JSON_DIR / file, encoding="utf-8") as f:
        return json.load(f)
#
pyV = load_json("vars.json")
gitD = load_json("git-data.json")
gLink = load_json("glink.json")
    #
    #
reffAtBr = (f"?ref={gitD["branch"]}")
#
link_limit = (pyV["linkLmt"])
htBsc = (gLink["ltp"]["bsc"])
htScr = (gLink["ltp"]["scr"])
    #
ghRaw = (gLink["gh"]["base"]["raw"])
ghApi = (gLink["gh"]["base"]["api"])
    #
ghRepo = (gLink["gh"]["path"]["repo"])
#
B_RAW_LINK = (htScr + link_limit + ghRaw)
B_API_LINK = (htScr + link_limit + ghApi)
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
