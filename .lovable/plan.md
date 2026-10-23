# Isolate the Network topic selection from Papers

## Root cause (confirmed in code)
- Choosing a topic in Network reloads the Artefact as a single-topic page (`?mode=topic&topicId=1`).
- When Papers starts up, it reads that address and quietly sets its own topic restriction to the same topic (`LibraryManager.init`). Papers already has the full 5,799-paper library loaded separately; it is this one inherited setting that shrinks it to Topic 1 and makes Paper ID 443 unfindable.
- My Reading List looks papers up in the full library, so it is not affected by the topic. Topics and Temporal Evolution don't read this setting.

## Fix (one small change in `public/artefact/index.html`)
- Stop Papers from inheriting the Network topic: remove the two lines in `LibraryManager.init` that copy the address topic into Papers' topic restriction. Papers then always starts from the full library.
- Nothing about Network changes: the topic stays selected, "Open in network" still opens the topic, and the network itself is untouched. The Network topic is never reset as a workaround.
- Papers' own search, connected/not-connected filter, sorting, pagination, bookmarks and abstracts stay as they are. Papers' typed search is kept while you're on the page. It is not carried across a topic change, because changing topic reloads the page, and that is how it already works.
- Topic Detail paper tables in the React site keep their topic-specific lists. They use separate code.

## Note: year and journal filters
Papers also applies the Network sidebar's year range and journal checkboxes. The brief doesn't mention these, so I'll leave them alone. Tell me if you want Papers separated from them too.

## 446 vs 443: check before changing any counts
The Network and Papers both decide a paper's topic the same way (its first topic link). So the 3-paper gap probably comes from Papers' year-range or journal filter, which leaves out papers without a year or outside the range. The cause isn't confirmed yet. I'll find the three missing paper IDs, explain why they drop out, and report back without changing any counts.

## Checks
- Choose Topic 1 in Network, then open Papers: it shows 5,799 papers, and searching 443 finds the paper.
- Go back to Network: Topic 1 is still selected. Switch to another topic, then back to Papers: Papers still shows the full library.
- Papers' filters, sorting, paging and abstracts still work.
- Bookmark a paper from Network and one from Papers: both appear in My Reading List.
- "Open in network" from Topics still works.
- Check Light and Dark Mode. All 26 automated tests pass. The figure capture modes are unchanged.
- Add a project rule to AGENTS.md: Papers never inherits the Network topic selection.
