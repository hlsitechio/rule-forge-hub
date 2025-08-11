@echo off
title RulesMarket - Delete All Products
color 0E

echo ============================================================
echo         RULESMARKET - DELETE ALL PRODUCTS
echo ============================================================
echo.
echo This will help you delete all 99 predefined products from
echo your RulesMarket marketplace to reset all categories to 0.
echo.
echo STEPS TO FOLLOW:
echo ----------------
echo 1. Your Supabase dashboard will open in your browser
echo 2. Sign in if needed
echo 3. Click on "SQL Editor" in the left sidebar
echo 4. Click "New query" button
echo 5. Copy the contents of DELETE_ALL_PRODUCTS.sql
echo 6. Paste it in the SQL editor
echo 7. Click "Run" button
echo.
echo Your project ID: oqvjazfvwxafxmgwtzti
echo.
echo Press any key to open Supabase dashboard...
pause >nul

:: Open Supabase dashboard
start https://supabase.com/dashboard/project/oqvjazfvwxafxmgwtzti/sql/new

echo.
echo ============================================================
echo The Supabase SQL Editor should now be open in your browser.
echo.
echo The SQL script is located at:
echo   scripts\DELETE_ALL_PRODUCTS.sql
echo.
echo After running the script, all categories should show:
echo   - All Platforms: 0
echo   - Cursor Rules: 0
echo   - System Prompts: 0
echo   - Agent Instructions: 0
echo   - Workflow Automation: 0
echo   - Development Tools: 0
echo   - Documentation: 0
echo   - MCP Documentation: 0
echo.
echo Press any key to exit...
pause >nul
