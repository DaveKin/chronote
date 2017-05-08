# chronote
chrome extension for note taking

## Thought process
Build as Chrome extension - no mobile usage but reasoned that for note taking, the user is likely to be using a keyboard.
Normally I would try to avoid building something browser-specific unless it was an internal development tool.

... also I've never built a Chrome extension so it could be fun.

## Key features
ability to start writing a note with a single click
ability to find and view previously written notes

### Advantage of using Chrome extension:
Association with URL - remind about note if revisiting the url or return to url which prompted a note

## Basic UX
single click or shortcut to activate
auto focus on input - allow type and submit
view saved notes, condensed view in list - click to view full

If notes exist for the current URL, allow the list view to switch between all and just notes for this URL.

## Further considerations

### sorting
date/time would seem to be the only useful sort field. Allow toggling ascending/descending sort.

### categorisation: 
allow arbitrary entry of categories
suggest existing categories while typing
offer most popular categories for single click selection

allow list filtering by category
