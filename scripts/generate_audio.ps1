Add-Type -AssemblyName System.Speech

$transcripts = @{
    "aud-bbc-interview-1953.wav" = "Democracy is not merely a form of government. It is primarily a mode of associated living, of conjoint communicated experience. Universal adult franchise ensures that no man or woman is discarded as political waste. The foundations of democratic morality must reside in equality and human fellowship."
    "aud-voice-america-1952.wav" = "If I was asked to name any particular article in this Constitution as the most important, an article without which this Constitution would be a nullity, I could not refer to any other article except Article 32. It is the very soul of the Constitution and the very heart of it."
    "aud-air-address-1942.wav" = "Labour is not a commodity. The working classes of India are the backbone of our national reconstruction. We have enacted the eight-hour workday, maternity benefits, and social insurance, because without economic democracy, political freedom is an empty boast."
    "aud-rajya-sabha-1953.wav" = "Rights are protected not by laws, but by the social and moral conscience of society. If social conscience is such that it does not want to recognize the rights which law chooses to confer, then no law can protect them. Constitutional morality must be cultivated by every citizen."
}

$outputDir = Join-Path $PSScriptRoot "..\public\audio"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

foreach ($filename in $transcripts.Keys) {
    $filePath = Join-Path $outputDir $filename
    $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $synth.Rate = -1
    $synth.SetOutputToWaveFile($filePath)
    $synth.Speak($transcripts[$filename])
    $synth.Dispose()
    Write-Host "Generated: $filePath (Size: $((Get-Item $filePath).Length) bytes)"
}
