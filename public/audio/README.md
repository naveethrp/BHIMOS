# Archival Audio Repository

Place verified archival audio recordings in this directory.

## Expected Naming Conventions
Match the archival record ID with `.mp3`, `.wav`, or `.m4a`:
- `aud-bbc-interview-1953.mp3` — BBC Radio Interview on Universal Franchise (May 1953)
- `aud-voice-america-1952.mp3` — Voice of America Broadcast on Article 32 (Feb 1952)
- `aud-air-address-1942.mp3` — All India Radio Address on Labour Rights (Sep 1942)

The global audio player checks `/audio/${recordId}.mp3` automatically and falls back gracefully with an archival status indicator if the audio file has not yet been deposited by the museum curator.
