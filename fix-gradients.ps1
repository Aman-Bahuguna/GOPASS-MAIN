# Script to replace gradients with solid colors and white with off-white
# across all dashboard files

$dashboardPath = "d:\Project\Gopass\src\pages\dashboards"

# Get all JSX files in dashboards
$files = Get-ChildItem -Path $dashboardPath -Filter "*.jsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content

    # ===== 1. REPLACE bg-white with bg-offwhite for cards =====
    # Card backgrounds - replace bg-white with off-white
    $content = $content -replace 'bg-white(?=/)', 'bg-[#f8f9fb]'
    $content = $content -replace "(?<!')bg-white(?!')", 'bg-[#f8f9fb]'
    # But keep text-white as is (already excluded by word boundary)
    
    # ===== 2. GRADIENT BUTTONS -> Solid brand colors =====
    # bg-gradient-to-r from-brand-100 to-brand-200 -> bg-brand-100
    $content = $content -replace 'bg-gradient-to-r from-brand-100 to-brand-200', 'bg-brand-100'
    $content = $content -replace 'bg-gradient-to-r from-brand-200 to-brand-100', 'bg-brand-200'
    $content = $content -replace 'bg-gradient-to-r from-brand-200 to-brand-300', 'bg-brand-200'
    $content = $content -replace 'bg-gradient-to-r from-brand-100 to-brand-300', 'bg-brand-100'
    
    # bg-gradient-to-br versions
    $content = $content -replace 'bg-gradient-to-br from-brand-100 to-brand-200', 'bg-brand-100'
    $content = $content -replace 'bg-gradient-to-br from-brand-200 to-brand-100', 'bg-brand-200'
    $content = $content -replace 'bg-gradient-to-br from-brand-200 to-brand-300', 'bg-brand-200'
    $content = $content -replace 'bg-gradient-to-br from-brand-100 to-brand-300', 'bg-brand-100'
    $content = $content -replace 'bg-gradient-to-br from-brand-100 via-brand-200 to-brand-300', 'bg-brand-200'
    $content = $content -replace 'bg-gradient-to-br from-brand-100 via-brand-200 to-purple-600', 'bg-brand-200'
    $content = $content -replace 'bg-gradient-to-r from-brand-200 via-purple-500 to-brand-100', 'bg-brand-200'
    
    # ===== 3. GRADIENT BACKGROUNDS -> Solid colors =====
    # Emerald/green gradients
    $content = $content -replace 'bg-gradient-to-r from-emerald-500 to-emerald-600', 'bg-emerald-500'
    $content = $content -replace 'bg-gradient-to-r from-emerald-500 to-teal-500', 'bg-emerald-500'
    $content = $content -replace 'bg-gradient-to-r from-emerald-400 to-teal-500', 'bg-emerald-500'
    $content = $content -replace 'bg-gradient-to-br from-emerald-500 to-teal-500', 'bg-emerald-500'
    $content = $content -replace 'bg-gradient-to-br from-emerald-400 to-teal-500', 'bg-emerald-500'
    $content = $content -replace 'bg-gradient-to-br from-emerald-400 to-emerald-600', 'bg-emerald-500'
    
    # Blue/indigo gradients
    $content = $content -replace 'bg-gradient-to-r from-blue-500 to-indigo-500', 'bg-blue-500'
    $content = $content -replace 'bg-gradient-to-br from-blue-500 to-indigo-500', 'bg-blue-500'
    $content = $content -replace 'bg-gradient-to-br from-blue-400 to-blue-600', 'bg-blue-500'
    $content = $content -replace 'bg-gradient-to-r from-blue-400 to-indigo-500', 'bg-blue-500'
    $content = $content -replace 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500', 'bg-blue-600'
    $content = $content -replace 'bg-gradient-to-br from-blue-50 to-indigo-50', 'bg-blue-50'
    
    # Purple/violet gradients
    $content = $content -replace 'bg-gradient-to-r from-purple-600 via-brand-200 to-brand-300', 'bg-brand-200'
    $content = $content -replace 'bg-gradient-to-br from-purple-500 to-violet-500', 'bg-purple-500'
    $content = $content -replace 'bg-gradient-to-r from-purple-500 to-violet-500', 'bg-purple-500'
    $content = $content -replace 'bg-gradient-to-br from-purple-500 to-pink-500', 'bg-purple-500'
    $content = $content -replace 'bg-gradient-to-r from-purple-500 to-pink-500', 'bg-purple-500'
    $content = $content -replace 'bg-gradient-to-br from-brand-200 to-purple-500', 'bg-brand-200'
    $content = $content -replace 'bg-gradient-to-r from-indigo-50 to-purple-50', 'bg-indigo-50'
    $content = $content -replace 'bg-gradient-to-r from-brand-50 to-purple-50', 'bg-brand-50'
    
    # Orange/amber gradients
    $content = $content -replace 'bg-gradient-to-r from-orange-500 to-amber-500', 'bg-orange-500'
    $content = $content -replace 'bg-gradient-to-br from-orange-500 to-amber-500', 'bg-orange-500'
    $content = $content -replace 'bg-gradient-to-r from-amber-500 to-orange-500', 'bg-amber-500'
    $content = $content -replace 'bg-gradient-to-br from-amber-500 to-orange-500', 'bg-amber-500'
    $content = $content -replace 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500', 'bg-amber-500'
    $content = $content -replace 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400', 'bg-amber-500'
    $content = $content -replace 'bg-gradient-to-br from-amber-400 to-amber-600', 'bg-amber-500'
    $content = $content -replace 'bg-gradient-to-r from-amber-400 to-red-500', 'bg-amber-500'
    
    # Red/rose gradients
    $content = $content -replace 'bg-gradient-to-r from-red-500 to-rose-500', 'bg-red-500'
    $content = $content -replace 'bg-gradient-to-br from-red-500 to-rose-500', 'bg-red-500'
    $content = $content -replace 'bg-gradient-to-r from-red-400 to-red-500', 'bg-red-500'
    $content = $content -replace 'bg-gradient-to-r from-red-400 to-orange-500', 'bg-red-500'
    $content = $content -replace 'bg-gradient-to-br from-red-400 to-orange-500', 'bg-red-500'
    $content = $content -replace 'bg-gradient-to-r from-red-500 to-orange-500', 'bg-red-500'
    $content = $content -replace 'bg-gradient-to-br from-red-50 via-orange-50 to-amber-50', 'bg-red-50'
    
    # Teal/cyan gradients
    $content = $content -replace 'bg-gradient-to-r from-teal-500 to-cyan-500', 'bg-teal-500'
    $content = $content -replace 'bg-gradient-to-br from-teal-500 to-cyan-500', 'bg-teal-500'
    
    # Pink gradients
    $content = $content -replace 'bg-gradient-to-br from-pink-400 to-pink-600', 'bg-pink-500'
    
    # Slate gradients
    $content = $content -replace 'bg-gradient-to-br from-slate-900 to-slate-800', 'bg-slate-900'
    $content = $content -replace 'bg-gradient-to-br from-slate-200 to-slate-300', 'bg-slate-200'
    $content = $content -replace 'bg-gradient-to-br from-slate-100 to-slate-200', 'bg-slate-100'
    $content = $content -replace 'bg-gradient-to-br from-slate-50 to-slate-100', 'bg-slate-50'
    $content = $content -replace 'bg-gradient-to-r from-slate-50 to-slate-100/50', 'bg-slate-50'
    $content = $content -replace 'bg-gradient-to-br from-slate-50/80 to-slate-100/50', 'bg-slate-50'
    
    # Mixed background gradients
    $content = $content -replace "bg-gradient-to-r from-white to-brand-50/30", "bg-[#f8f9fb]"
    $content = $content -replace "bg-gradient-to-br from-brand-100/10 to-brand-200/10", "bg-brand-50"
    $content = $content -replace "bg-gradient-to-r from-emerald-50 to-emerald-100", "bg-emerald-50"
    $content = $content -replace "bg-gradient-to-br from-blue-50/80 to-blue-100/50", "bg-blue-50"
    
    # ===== 4. HOVER GRADIENT STATES =====
    $content = $content -replace 'hover:from-emerald-600 hover:to-teal-600', 'hover:bg-emerald-600'
    $content = $content -replace 'hover:from-slate-300 hover:to-slate-400', 'hover:bg-slate-300'
    
    # ===== 5. CONFIG OBJECTS - gradient property to solid property =====
    # Replace gradient config strings in colorConfig objects
    $content = $content -replace "gradient: 'from-orange-500 to-amber-500'", "solid: 'bg-orange-500'"
    $content = $content -replace "gradient: 'from-blue-500 to-indigo-500'", "solid: 'bg-blue-500'"
    $content = $content -replace "gradient: 'from-emerald-500 to-teal-500'", "solid: 'bg-emerald-500'"
    $content = $content -replace "gradient: 'from-purple-500 to-violet-500'", "solid: 'bg-purple-500'"
    $content = $content -replace "gradient: 'from-red-500 to-rose-500'", "solid: 'bg-red-500'"
    $content = $content -replace "gradient: 'from-teal-500 to-cyan-500'", "solid: 'bg-teal-500'"
    $content = $content -replace "gradient: 'from-blue-400 to-indigo-500'", "solid: 'bg-blue-500'"
    $content = $content -replace "gradient: 'from-emerald-400 to-teal-500'", "solid: 'bg-emerald-500'"
    $content = $content -replace "gradient: 'from-slate-300 to-slate-400'", "solid: 'bg-slate-400'"
    $content = $content -replace "gradient: 'from-amber-400 to-orange-500'", "solid: 'bg-amber-500'"
    $content = $content -replace "gradient: 'from-purple-500 to-pink-500'", "solid: 'bg-purple-500'"
    $content = $content -replace "gradient: 'from-amber-500 to-orange-500'", "solid: 'bg-amber-500'"
    
    # Replace references to config.gradient with config.solid
    $content = $content -replace '\$\{config\.gradient\}', '${config.solid}'
    $content = $content -replace '\$\{status\.gradient\}', '${status.solid}'
    
    # ===== 6. ICON GRADIENT CONFIG (user stat cards) =====
    $content = $content -replace "icon: 'bg-gradient-to-br from-blue-400 to-blue-600'", "icon: 'bg-blue-500'"
    $content = $content -replace "icon: 'bg-gradient-to-br from-brand-100 to-brand-300'", "icon: 'bg-brand-100'"
    $content = $content -replace "icon: 'bg-gradient-to-br from-emerald-400 to-emerald-600'", "icon: 'bg-emerald-500'"
    $content = $content -replace "icon: 'bg-gradient-to-br from-amber-400 to-amber-600'", "icon: 'bg-amber-500'"
    $content = $content -replace "icon: 'bg-gradient-to-br from-pink-400 to-pink-600'", "icon: 'bg-pink-500'"
    
    # ===== 7. REMAINING bg-gradient patterns (catch-all for simpler cases) =====
    # Approval status banners
    $content = $content -replace 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500', 'bg-amber-500'
    $content = $content -replace 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500', 'bg-emerald-600'
    
    # Progress bar gradients
    $content = $content -replace 'bg-gradient-to-r from-brand-100 to-brand-200', 'bg-brand-100'
    $content = $content -replace 'bg-gradient-to-b from-brand-200 to-brand-100', 'bg-brand-200'
    $content = $content -replace 'bg-gradient-to-b from-blue-400 to-blue-300', 'bg-blue-400'

    # Gradient decoration config objects  
    $content = $content -replace "gradient: 'from-blue-500 to-indigo-500'", "solid: 'bg-blue-500'"
    $content = $content -replace "gradient: 'from-emerald-500 to-teal-500'", "solid: 'bg-emerald-500'"

    # ===== 8. Remove remaining "bg-gradient-to-br" with config refs that use solid now =====
    $content = $content -replace 'bg-gradient-to-br \$\{config\.solid\}', '${config.solid}'
    $content = $content -replace 'bg-gradient-to-r \$\{config\.solid\}', '${config.solid}'
    $content = $content -replace 'bg-gradient-to-br \$\{status\.solid\}', '${status.solid}'
    $content = $content -replace 'bg-gradient-to-r \$\{status\.solid\}', '${status.solid}'
    
    # ===== 9. Functional gradient overlays - keep but clean up text =====
    # Keep image overlay gradients (from-black/X, from-transparent) as they serve functional purpose
    # These are intentionally NOT replaced:
    # - bg-gradient-to-t from-black/60 via-transparent to-transparent (image overlay)
    # - bg-gradient-to-t from-black/30 via-transparent to-transparent
    # - bg-gradient-to-r from-transparent via-white/20 to-transparent (shimmer)
    # - radial-gradient patterns (dot patterns)
    # - repeating-linear-gradient (stripe patterns)
    
    # ===== 10. Replace remaining gradient button common patterns =====
    $content = $content -replace "bg-gradient-to-r from-brand-100 to-brand-200", "bg-brand-100"
    $content = $content -replace "bg-gradient-to-br from-brand-100 to-brand-300", "bg-brand-100"
    $content = $content -replace "bg-gradient-to-br from-brand-200 to-brand-300", "bg-brand-200"
    $content = $content -replace "bg-gradient-to-r from-brand-100 via-brand-200 to-brand-300", "bg-brand-200"
    
    # ===== 11. Event card fallback gradients =====
    $content = $content -replace "bg-gradient-to-br from-brand-100 via-brand-200 to-brand-300", "bg-brand-200"
    $content = $content -replace "bg-gradient-to-r from-brand-200 to-brand-300", "bg-brand-200"
    
    # ===== 12. COMMENTS cleanup =====
    $content = $content -replace 'Decorative gradient line', 'Decorative accent line'
    $content = $content -replace 'Background gradient on hover', 'Background accent on hover'
    $content = $content -replace 'Top gradient bar', 'Top accent bar'
    $content = $content -replace 'Header with gradient', 'Header accent'
    $content = $content -replace 'Avatar with gradient', 'Avatar accent'
    $content = $content -replace 'Soft mesh gradient overlay', 'Soft mesh overlay'
    $content = $content -replace 'beautiful gradients', 'beautiful colors'

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "`nDone! All gradient replacements completed."
