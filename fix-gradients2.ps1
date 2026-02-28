# Second pass to catch remaining gradients
$dashboardPath = "d:\Project\Gopass\src\pages\dashboards"
$files = Get-ChildItem -Path $dashboardPath -Filter "*.jsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content

    # StatCard colorClasses - remove bg-gradient-to-br prefix from dynamic classes
    # These use ${colorClasses[color]} pattern
    
    # ProfilePage gradients
    $content = $content -replace "bg-gradient-to-r from-slate-100 to-slate-50", "bg-slate-100"
    $content = $content -replace "bg-gradient-to-r from-amber-50 to-orange-50", "bg-amber-50"
    $content = $content -replace "bg-gradient-to-br from-brand-200 to-brand-400", "bg-brand-200"
    
    # OrganizerEventCard inline gradient - status bar
    $content = $content -replace "bg-gradient-to-r \`\$\{event\.status === 'UPCOMING' \? 'from-blue-400 to-indigo-500'", "`$`{event.status === 'UPCOMING' ? 'bg-blue-500'"
    
    # CustomFieldsBuilder
    $content = $content -replace "bg-gradient-to-r \`\$\{fieldType", "`$`{fieldType"
    $content = $content -replace "bg-gradient-to-br from-slate-50/90 via-violet-50/40 to-purple-50/60", "bg-slate-50"
    $content = $content -replace "bg-gradient-to-br from-violet-500 to-purple-400", "bg-violet-500"
    $content = $content -replace "bg-gradient-to-br from-violet-100 to-purple-100", "bg-violet-100"
    $content = $content -replace "bg-gradient-to-r from-violet-500 to-purple-500", "bg-violet-500"
    $content = $content -replace "bg-gradient-to-r from-violet-100/80 to-purple-100/80", "bg-violet-100"
    
    # ErrorState
    $content = $content -replace "bg-gradient-to-br from-red-50 to-red-100", "bg-red-50"
    
    # EmptyPendingState
    $content = $content -replace "bg-gradient-to-br from-emerald-50 to-teal-50", "bg-emerald-50"
    
    # CollegeEventsSection
    $content = $content -replace "bg-gradient-to-r from-blue-50 to-indigo-50", "bg-blue-50"
    $content = $content -replace "bg-gradient-to-br from-emerald-500 to-green-600", "bg-emerald-500"
    $content = $content -replace "bg-gradient-to-br from-amber-500 to-orange-600", "bg-amber-500"
    $content = $content -replace "bg-gradient-to-br from-blue-500 to-indigo-600", "bg-blue-500"
    
    # ActionButton
    $content = $content -replace "bg-gradient-to-r from-brand-200 to-purple-600 hover:from-brand-100 hover:to-purple-500", "bg-brand-200 hover:bg-brand-100"
    
    # AdminCreateEventForm
    $content = $content -replace "bg-gradient-to-br from-blue-50 to-blue-100/50", "bg-blue-50"
    
    # user WelcomeSection
    $content = $content -replace "bg-gradient-to-r from-brand-50/50 via-white to-brand-50/30", "bg-brand-50/50"
    
    # QuickMetrics - uses dynamic ${metric.bg} - these are bg-color classes, leave bg-gradient-to-br prefix
    # Actually these are using the classes like 'from-blue-500 to-indigo-500' which need to be solid
    
    # EmptyState admin common
    # These use dynamic configs, harder to replace by regex

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "`nSecond pass done!"
