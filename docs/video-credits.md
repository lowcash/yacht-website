# Hero video credits

All four clips are from Pixabay. For each clip the Pixabay page was fetched and shows the licence line "Free for use under the Pixabay Content License" (Pixabay Content License: free commercial use, attribution not required, content may be modified; not allowed: selling unaltered copies, implying endorsement by depicted people or brands). Files were fetched with plain `curl` from the public Pixabay CDN (`cdn.pixabay.com/video/.../<id>_small.mp4`; `_large.mp4` for 224160 and 106066). Pexels pages answer HTTP 403 to automated requests, so no Pexels clip is used.

Theme: a golden-hour superyacht at anchor, a luxury motor yacht underway in an aerial shot, a drone approach to a sailing yacht on turquoise water, and a Phuket bay with sailing boats. No people in focus, no text, no watermarks. The amateur marina and dock aerials of the previous loop were removed (shaky, flat).

| #   | ID     | Title (Pixabay)         | Author         | Page                                                                | Licence label read                             | Used (source time)                                                                                       |
| --- | ------ | ----------------------- | -------------- | ------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 1   | 224160 | Yacht, Luxury, Cruise   | FilipFilipovic | https://pixabay.com/videos/yacht-luxury-cruise-ship-224160/         | Free for use under the Pixabay Content License | superyacht at anchor, golden hour, 4-8 s (plus 3.5-4.5 s for the loop seam)                              |
| 2   | 106066 | Billionaire, Blue, Boat | redemoka       | https://pixabay.com/videos/billionaire-blue-boat-boats-106066/      | Free for use under the Pixabay Content License | luxury motor yacht underway, stable aerial with bow wake, 0.5-4.5 s (wide) and 11-15 s (cropped to 1.3x) |
| 3   | 237117 | Ocean, Sea, Aerial View | Oleh_1977      | https://pixabay.com/videos/ocean-sea-aerial-view-copy-space-237117/ | Free for use under the Pixabay Content License | drone approach to a sailing yacht, 0.5-4.5 s                                                             |
| 4   | 332778 | Drone, Aerial, Phuket   | FlyMore        | https://pixabay.com/videos/drone-aerial-phuket-thailand-332778/     | Free for use under the Pixabay Content License | Phuket bay, sailing boats underway, 0.2-4.2 s                                                            |

Loop: 5 shots of 4 s with 0.5 s cross-fades (3.5 s step), the first shot repeated at the end (starting 0.5 s early) and the output trimmed at the end of that cross-fade, so the last frame is the first frame (18 s, 24 fps, no audio). Length rationale: hero background best practice is 12-20 s, 4-6 shots of 3-5 s, continuous slow forward or diagonal motion; 18 s with 5 shots keeps the files small and the loop unobtrusive. Common grade: light `eq` (contrast, saturation), slight warm highlights and cool shadows, light `hqdn3d` denoise. Output: H.264 1080p (3.2 MB), VP9 1080p WebM (3.3 MB), H.264 720p (2.0 MB); the poster (AVIF/WebP) is the first frame of the 1080 MP4.

## Not used (checked)

Pixabay 284684 (aerial marina, handheld/shaky, removed on author feedback), 332781 (Phuket headland, dropped to keep five shots), 338174 (marina, black and white grade), 291088 (sailboats only dots on the horizon), 345350, 286049, 351290, 363905 (AI-generated), 168923 and 272540 (portrait), 106070 (small speedboat in clouds, not luxury), 91774 (small motorboat with people), 105813, 105814, 49466, 38371, 104490 (not luxury yachts). Mixkit "Restricted" clips and Pexels clips (pages blocked, licence not readable) are not used.

## Gaps

No free footage of rope or rigging close-ups, deck hardware or a crew at work with a readable licence was found. A second distinct luxury motor-yacht clip was not found on Pixabay (results are mostly AI-generated or moored), so 106066 is used in two cuts (wide and cropped). Pixabay licence text was read from each clip page; the site-wide licence page itself (pixabay.com/service/license-summary/) answers 403 to automated requests.
