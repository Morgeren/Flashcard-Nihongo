# V19.1 Pre-Integration Audit

## Base project

The selected base is `nihongo_study_deck_v19_0_comprehensive_overhaul(3).zip`, the V19.0 Foundation build. Its README describes a modularized V18.x/V19 foundation rather than a fully completed comprehensive roadmap. The existing 12 legacy scripts are kept in their original execution order. V19 modules include matching, content audit, and SRS support.

## Data inventory reported by the base project

- Vocabulary: 1,205 entries; no duplicate IDs or missing core fields in the existing validator.
- Reading: 950 core readings plus 6 legacy readings.
- Reading vocabulary references: 3,330 total; 2,351 exact matches and 979 unmatched references.
- Kanji index: 801 characters extracted from vocabulary headwords; readings, meanings, stroke counts, and radicals are not claimed as verified.
- Grammar index: 49 extracted patterns, all marked `needs_review`.
- The base README reports 178 vocabulary entries with structurally valid Japanese/translation example pairs; 1,027 entries do not have such a pair.
- Language review is incomplete for the reading corpus.

## Architecture and compatibility observations

- Existing UI is assembled from legacy V3/V10/V11/V13/V18.2/V18.6/V18.7 scripts plus V19 modules.
- V19.1 uses the existing V13 navigation API as a bridge to legacy routes instead of reimplementing learning features.
- Existing root appearance selectors `.light-theme` and `.dark-theme` are retained. The seasonal adapter provides a separate semantic token namespace.
- Existing preference storage uses LocalStorage key `jvfc_prefs_v4` and the `theme` property (`light` / `dark`); the Seasonal Engine reads the root appearance classes and does not set the preference.
- Existing vocabulary/Reading datasets, legacy JS, and V19 modules were not edited during this integration.

## Product scope findings

- A dedicated Writing Practice module is not identified in the V19.0 base.
- No identifiable pet-system implementation or entry point was found in the inspected source. No pet-related code was changed. This does not prove that no pet-related external/user-specific extension exists outside the supplied archive.
- The Kanji destination is presented honestly as discovery via vocabulary entries, not as a full verified Kanji dictionary.

## Main integration risks

1. Old CSS contains multiple generations of tokens; global replacement would risk legacy screens. V19.1 uses a separate adapter.
2. Old navigation uses multiple route IDs; V19.1 maps the four primary destinations to the existing V13 route API.
3. Service-worker cache changes can cause update/offline regressions; the existing fetch and activation strategy was retained, with an updated cache version and expanded local precache.
4. Existing-profile migration depends on same-origin storage behavior and must be tested on a deployed copy with a backup first.
