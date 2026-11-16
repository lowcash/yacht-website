# Hero video credits

All five clips are from Pixabay. For each clip the Pixabay page was fetched and shows the licence line "Free for use under the Pixabay Content License" (Pixabay Content License: free commercial use, attribution not required, content may be modified; not allowed: selling unaltered copies, implying endorsement by depicted people or brands). Files were fetched with plain `curl` from the public Pixabay CDN (`cdn.pixabay.com/video/.../<id>_small.mp4`, `_large.mp4` for 224160). Pexels pages answer HTTP 403 to automated requests, so no Pexels clip is used any more (the previous Pexels loop was replaced).

Theme: an anchored superyacht in golden light, Phuket coast and bay with sailing boats underway, an aerial marina, a sailing yacht on turquoise water. No people in focus, no text, no watermarks. Four of five shots are tropical or Phuket; the marina and the superyacht are not Thailand.

| #   | ID     | Title (Pixabay)              | Author         | Page                                                                  | Licence label read                             | Used (source time)                            |
| --- | ------ | ---------------------------- | -------------- | --------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------- |
| 1   | 224160 | Yacht, Luxury, Cruise        | FilipFilipovic | https://pixabay.com/videos/yacht-luxury-cruise-ship-224160/           | Free for use under the Pixabay Content License | superyacht at anchor, golden hour, 4-8.5 s    |
| 2   | 332778 | Drone, Aerial, Phuket        | FlyMore        | https://pixabay.com/videos/drone-aerial-phuket-thailand-332778/       | Free for use under the Pixabay Content License | Phuket bay, sailing boats underway, 0.2-4.7 s |
| 3   | 284684 | Marina, Bay, Boats, Ships    | phlyingdoctor  | https://pixabay.com/videos/marina-bay-boats-ships-yachts-284684/      | Free for use under the Pixabay Content License | aerial marina, 0.5-5 s and 4.5-9 s (two cuts) |
| 4   | 237117 | Ocean, Sea, Aerial View      | Oleh_1977      | https://pixabay.com/videos/ocean-sea-aerial-view-copy-space-237117/   | Free for use under the Pixabay Content License | drone approach to a sailing yacht, 0.5-5 s    |
| 5   | 332781 | Drone, Aerial, Phuket, Coast | FlyMore        | https://pixabay.com/videos/drone-aerial-phuket-thailand-coast-332781/ | Free for use under the Pixabay Content License | Phuket headland and sailing yacht, 1-5.5 s    |

Loop: 6 shots of 4.5 s with 0.5 s cross-fades, the first shot repeated at the end (starting 0.5 s early) and the output trimmed at the end of that cross-fade, so the last frame is the first frame (24.5 s, 24 fps, no audio). Common grade: light `eq` (contrast, saturation), slight warm highlights and cool shadows, light `hqdn3d` denoise. Output: H.264 1080p (3.5 MB), VP9 1080p WebM (3.7 MB), H.264 720p (2.2 MB); the poster (AVIF/WebP) is the first frame of the 1080 MP4.

## Not used (checked)

Pixabay 338174 (marina, black and white grade, does not match the colour grade), 291088 (sailboats only dots on the horizon), 345350 (author states it is AI-generated), 168923 and 272540 (portrait). Mixkit "Restricted" clips and Pexels clips (pages blocked, licence not readable) are not used.

## Gaps

No free footage of rope or rigging close-ups, deck hardware or a crew at work with a readable licence was found. Pixabay licence text was read from each clip page; the site-wide licence page itself (pixabay.com/service/license-summary/) answers 403 to automated requests.
