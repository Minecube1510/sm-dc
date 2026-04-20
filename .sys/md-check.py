# .sys/md-check.py #

# ~ ~ ~ ~ ~ #
# IMPORTS #
import os
import re
import sys
import yaml
# IMPORTS #
#
# SYSTEM #
BASE_DIR = "BASE"
VALID_TYPES = {
    "Assets",
    "Entry_Doc",
    "Record",
    #
    "Explanation",
    #
    "UNDEFINED",
}
docs = []
#
FILTER_TYPE = None
if len(sys.argv) > 1:
    FILTER_TYPE = sys.argv[1]
for root, dirs, files in os.walk(BASE_DIR):
    for f in files:
        if not f.endswith(".md"):
            continue
        path = os.path.join(root, f)
        try:
            with open(path, "r", encoding="utf-8") as file:
                text = file.read()
        except:
            print("FILE ERROR:", path)
            continue
#
        meta = {}
        block = re.search(r'<!--(.*?)-->', text, re.S)
        #
        if block:
            content = block.group(1).strip()
            if content.startswith("---"):
                parts = content.split("---", 2)
                if len(parts) >= 3:
                    yaml_text = parts[1]
                    try:
                        parsed = yaml.safe_load(yaml_text)
                        if isinstance(parsed, dict):
                            meta = parsed
                    except yaml.YAMLError:
                        print("YAML ERROR:", path)
        docs.append((meta, path))
# SYSTEM #
#
# PRINTING #
found = 0
#
print("\n===== HASIL =====")
for meta, path in docs:
    filename = (os.path.basename(path))
    #
    status = meta.get("Doc_Article", "UNDEFINED")
    cek_stat = status.replace("_", " ")
    #
    if status not in VALID_TYPES:
        status = "UNDEFINED"
    # filter CMD
    if FILTER_TYPE and status != FILTER_TYPE:
        continue
    #
    print(f"[{cek_stat}] - {filename} -> {path}")
    found += 1
#
if FILTER_TYPE and found == 0:
    print("Not-Found as Filtered, sorry...")
#
print("===== AKHIR =====\n")
# PRINTING #

# ~ ~ ~ ~ ~ #


#
