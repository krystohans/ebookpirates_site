#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix duplicate functions and constants in eBookPirates files
"""

import re

def fix_parancsnoki_hid():
    """Remove duplicate MAIN_SPREADSHEET_ID from parancsnoki_hid.js"""
    filepath = 'parancsnoki_hid.js'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove duplicate MAIN_SPREADSHEET_ID in getBookDataByCopyCode function
    old_pattern = r"function getBookDataByCopyCode\(copyCode\) \{\s+const MAIN_SPREADSHEET_ID = '1MGfMsfMij_eazNAfbc3FM3netxz-Ztr_jZIlfGwkMdw';"
    new_text = "function getBookDataByCopyCode(copyCode) {"
    
    content = re.sub(old_pattern, new_text, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✓ Fixed MAIN_SPREADSHEET_ID duplicate in parancsnoki_hid.js")


def fix_uj_konyv_bevitel():
    """Protect window.location with typeof check"""
    filepath = 'js/uj_konyv_bevitel.js'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix window.location reference with typeof guard
    old_line = "    if (window && window.location && window.location.search) {"
    new_line = "    if (typeof window !== 'undefined' && window.location && window.location.search) {"
    
    content = content.replace(old_line, new_line)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✓ Protected window.location in js/uj_konyv_bevitel.js")


def remove_index_html_duplicates():
    """Remove duplicate functions from index.html"""
    filepath = 'index.html'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # List of patterns to remove (duplicate functions)
    patterns = [
        # Remove duplicate login function
        (r'        function login\(\) \{\s+var formData = \{\s+email: [^}]+\};\s+callBackend\([\'"]performLogin[\'"], \[formData\], function\(\) \{\s+window\.location\.href = [^\}]+\}[^\}]*\};?\s+\}', ''),
        # Remove duplicate preloadLoadingGif
        (r'        function preloadLoadingGif\(\) \{\s+callBackend\([\'"]preloadLoadingGif[\'"], \[\], function\(\) \{\s*\}[^\}]*\);?\s+\}', ''),
    ]
    
    for pattern, replacement in patterns:
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✓ Removed duplicate functions from index.html")


if __name__ == '__main__':
    try:
        fix_parancsnoki_hid()
        fix_uj_konyv_bevitel()
        remove_index_html_duplicates()
        print("\n✓ All fixes applied successfully!")
    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()
