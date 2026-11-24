---
date-created: 2026-07-05
description: A measurable, mostly-ordinal coordinate vector for any occurrence of any structure in this corpus, independent of what the occurrence is currently named, and the fibered-lexicon setup that a naming act can be read as a section of once those coordinates are fixed.
keywords:
  - naming
  - register
  - fca
  - intension
  - site
  - sheaf
  - obsmetrologia (“infomaterial” at time of writing)
  - polysemy
status: research + instrument specification; no implementation
title: Lexical Coordinates of Structure Occurrences
---
## Abstract

An occurrence of a mathematical structure in this corpus — one function, one Lean declaration, one module — is currently named by whoever wrote it, in whatever register that person reached for that day.
This note asks a narrower question than "what should we call it": *where is it*, as a position in a space that does not mention names at all.
It states that position as a coordinate vector Λ, built entirely from structures already proved or already measured in this repository (an FCA concept lattice over a claim/term incidence, a four-valued charge algebra, a regime classification, a cohomological obstruction rank, a substance ladder, a kinematic level, a metallization side), and it sets up — without solving — the second stage, in which a name is chosen by a section of a lexicon fibered over that coordinate space.
Every claim below is tagged with how it was checked this session: **proven** (a Lean theorem, cited by name, that I read), **measured** (an empirical instrument's output, cited by name, that a prior note reports and I did not personally re-run), **built+green** (live TypeScript I opened and read), **research-grade** (stated in a note as a finding, not independently re-derived here), or **conjecture** (explicitly unproved, in this note or its primaries).
Nothing here is upgraded past the tag its primary source gives it.

## 0. What was read, and what was not

Read in full this session, before any claim below was written:

- `lib/emsenn/src/lib/infomaterial/dev/content/notes/2026/07/04/2026-07-04-nomenclature-registers-as-forced-readouts.md` (**note 1** below) — all ten sections.
- `lib/emsenn/src/apps/metroplat/dev/content/notes/2026/07/03/2026-07-03-research-on-naming-the-whole-system.md` (**note 2** below), including its 2026-07-04 addendum.
- `lib/emsenn/src/lib/infomaterial/Infomaterial/Site/Intension.lean` — the whole file (882 lines).
- `lib/emsenn/src/lib/infomaterial/Infomaterial/Site/Topic.lean` — `TermContext`, `Concept`, `Topic` and their immediate lemmas (first ~140 lines).
- `lib/emsenn/src/lib/infomaterial/Infomaterial/Calculus/Order/FormalConceptAnalysis.lean` — the module header and the first ~110 lines (`ExtSet`/`IntSet`, `primeA`/`primeB`, `closeA`/`closeM`, the Galois-connection theorems).
- `lib/emsenn/src/lib/infomaterial/Infomaterial/Closure/Regime.lean` — the `ClosureRegime` inductive and its classifier (lines 1–85).
- `lib/emsenn/src/lib/infomaterial/Infomaterial/Relational/Spacetime/Boundary/Hole.lean` — the whole file (919 lines): `Region`, `HoleRegion`, `ReadoutExterior`, `CausalAdjacent`, `Shroud`, `Hole`.
- `lib/emsenn/src/lib/infomaterial/Infomaterial/Articulation/Articulating/Cell.lean` — the four-corner `Articulating.Corner` inductive (`potential`/`active`/`stable`/`absurd`).
- `lib/emsenn/src/apps/metroplat/dev/content/notes/2026/07/05/2026-07-05-plan-for-the-metroplat-development-campaign.md` — §8 in context of the whole note.
- `lib/emsenn/src/apps/metroplat/AGENTS.md` (the package's working law; there is no separate `CLAUDE.md` in this package — the repository root `CLAUDE.md` imports the root `AGENTS.md`, and this package carries its own `AGENTS.md` instead).
- `lib/emsenn/src/apps/metroplat/lib/persistence/index.mts` — the whole file (302 lines): `WitnessRow`, `witnessJournalTier`, `witnessIdentity`, `witnessLogInformation`.
  (2026-07-31 note: `lib/metroplat`/`@emsenn/metroplat` is not in the live tree at any cited path; a legacy archive checkout survives at `javascript-engineering-services-section/lib/legacy/metroplat/` (now `@red-cup-engineering/metroplat`) but lacks this cited `lib/persistence/index.mts`, so this rewrite could not locate this specific file to verify the line count or identifier names.
  The nearest real thing to this example's subject matter is the witness-journal-engineering-services-section at `lib/emsenn/services/561-group/services/red-cup-engineering/services/software-services-section/services/semiotic-software-services-section/services/witness-journal-engineering-services-section/services/`.
  Preserved here as the note's original worked example, not as confirmed current fact.)
- `lib/emsenn/src/apps/metroplat/services/filesystem/index.mts` — header and first 60 lines (the host-boundary contrast case).
- `lib/emsenn/src/apps/metroplat/services/filesystem-store/index.mts` — imports only (confirms it consumes the witness/content-store structures `services/filesystem/` does not).
- `lib/emsenn/src/apps/metroplat/src/running/session.mts` lines 920–1060 (`stringsFromJson`, `objectiveTexts`, `obligationTexts`, `chronicleWorkReadFromChronicle`).
- `lib/emsenn/src/apps/metroplat/services/state-cuts/index.mts` lines 740–830 (the `session-presence` cut deriver).
- `lib/emsenn/src/apps/metroplat/services/session-presence/index.mts` and `lib/emsenn/src/apps/metroplat/lib/closure/analysis/session-presence.mts` — both whole files.
- `lib/emsenn/src/apps/metroplat/src/capability/index.mts` — grepped and spot-read at `WORK_LEVELS` (line 556), the scope helper (line 576), the jural-relation grammar comment (line 675), `governance` (line 972) — not read end to end.
- Grepped, to check a specific negative claim used in §8.2: no `Goal` structure/inductive/class or "commitment"/"target-history" object exists anywhere under `lib/calculus`, `lib/closure`, or `src/capability` in the metroplat package.
  Zero hits.

**Not read this session, cited only as note 1 reports them**, with maturity tagged accordingly wherever used: `Infomaterial/Language/Positing/Meme.lean`, `Infomaterial/Cohomology/SettlingCohomologyH1.lean`, `Infomaterial/Relational/Material/Glass.lean`, `Infomaterial/Relational/Spacetime/Boundary/HoleDiamondKinematicSpace` (module path as named in note 1 — not independently located), `Infomaterial/Calculus/Algebra/MetallizationDichotomy.lean` (module path as named in note 1), `Infomaterial/Language/Predicating/CurryHowardLambek.lean` (only its header, for the Church–Rosser citation already in root `CLAUDE.md`), and the original `2026-07-03-four-regimes-four-pathologies.md` audit (cited only via note 1 §4's paraphrase, not fetched independently).
This is a lower bound on the corpus's treatment of these structures, not a claim that nothing else touches them.

## 1. Thesis: naming is two stages, and this paper is stage one

Take any occurrence of a structure in this corpus — a function body, a Lean declaration, a note's use of a word for a thing.
Call it S_o: the structure S as it occurs at one particular site o (one module, one line range, one call site).
Today, S_o already has a name — whatever word the author reached for.
The question this paper answers is not "is that name right."
It is: independent of any name at all, **where is S_o** — as a position in a space built from things the corpus has already proved or already measures?

The thesis, stated once and then unpacked for the rest of the paper:

> Naming is a two-stage act.
> Stage one measures WHERE an occurrence is: a coordinate vector Λ(S_o), built from proven and measured invariants, that does not read the occurrence's own name at all.
> Stage two selects a name by choosing a section of a lexicon fibered over that coordinate space — one anchor, per earned register, per position.
> Current names are **data** for checking a stage-one measurement against a stage-two choice; they are never an **input** to the measurement itself.

Stage one is what this paper builds and worked-examples against real code.
Stage two is set up in §6 and left as a conjecture chaining onto open genus-identification work already recorded in note 2 — not solved here.

Why this split matters, concretely: the corpus's own working law (root `CLAUDE.md`, quoted in full below) already states the failure mode stage one is built to catch —

> "A capability that looks new from the angle you're holding it is overwhelmingly likely already built, proven, and live — under one of its *other* proper names."

and the metroplat package's own `AGENTS.md` states the mirror-image failure on the implementation side —

> "Before writing any conditional, boolean classifier, regex heuristic, ranking, coverage check, or 'measure how much / whether X' logic: that capability almost certainly already exists here as real mathematics.
> Find it and use it."

Both are instances of one fact: whether something is "new" or "the same as X" is a question about **position**, not about **vocabulary**.
This paper is the formal version of "check the position before trusting the word."

## 2. Formal preliminaries — self-contained

Everything in this section is quoted or directly restated from the files in §0; no symbol is used before it is defined here.

### 2.1 Formal Concept Analysis (FCA)

A **formal context** is a triple (G, M, I): a set of *objects* G, a set of *attributes* M, and an *incidence relation* I : G → M → Prop, read "object g has attribute m." A subset of objects is modeled as a predicate A : G → Prop (an `ExtSet G`); a subset of attributes as B : M → Prop (an `IntSet M`), both ordered by pointwise implication.

Two **derivation operators** connect the two subset lattices (`Infomaterial/Calculus/Order/FormalConceptAnalysis.lean:22-24`, proven):

- `primeA I A := fun m => ∀ g, A g → I g m` — the attributes shared by every object in A.
- `primeB I B := fun g => ∀ m, B m → I g m` — the objects bearing every attribute in B.

These form a **Galois connection**: antitone in each argument, extensive (A ⊆ primeB(primeA A)), and satisfying primeA(primeB(primeA A)) = primeA A. The composite `closeA I A := primeB I (primeA I A)` is therefore a **closure operator** (extensive, monotone, idempotent) on object-subsets; dually `closeM I B := primeA I (primeB I B)` closes attribute-subsets.
A **formal concept** is a pair (A, B) with primeA I A = B and primeB I B = A — A is called the concept's *extent*, B its *intent*.
Ordered by extent-inclusion, the concepts of one context form a complete lattice (proven — the Fundamental Theorem of FCA, realized in this file's later sections, not re-quoted here since this paper does not need the lattice-join/meet constructions, only the single-concept closure).

### 2.2 The corpus's own claim/term context

`Infomaterial/Site/Topic.lean` instantiates this abstractly, with a naming choice that inverts a first guess: **G, the FCA objects, are `Claim`s** (proven theorem instances, located at site points) and **M, the FCA attributes, are `Term`s** (the corpus's own named terms) (`structure TermContext where Term : Type; incidence : Claim -> Term -> Prop`, `Topic.lean:32-36`; comment there: "Incidence: a claim point bears a term").
This is the precise sense of "claim constrains term" used throughout: a proven claim q *bears* a term t when `incidence q t` holds.

For one term t in a context C, its **direct profile** is the set of claims bearing it:

```
profile C t := fun q => C.incidence q t          -- an ExtSet Claim
```

(`Site/Intension.lean:73-74`, `TermContext.profile`).
Closing that profile as an object-subset (`closeA`, §2.1) and pairing it with the attribute-subset it generates is the term's **generated concept**:

```
generatedConcept C t := Concept.ofExtent C (profile C t)
```

(`Site/Intension.lean:76-78`).
Two theorems anchor this: the generated concept's extent is closed (`generatedConcept_extent_closed`, `Intension.lean:81-84`, proven), and the generating term always lies in the generated concept's own intent (`generatedConcept_in_intent`, `Intension.lean:87-90`, proven) — i.e. t ∈ primeA(profile(t)), so a term is never excluded from the concept it generates.

A **topic** localizes a concept at a claim site point with an explicit clopen cover that really covers that point's support (`structure Topic`, `Topic.lean:71-82`, `Site.Covers point.U cover`); term readings, valuated term readings, and their cover-restriction/gluing lemmas (`TermReading`, `ValuatedTermReading`, `ValuatedTermReading.PatchFamily`, all `Intension.lean:145-394`, proven) give the sheaf-style patching machinery this paper's §6 fibration borrows from directly — covers glue on overlaps by construction, and a `PatchFamily`/`Sheaf.Cover` is the already-proven structure for "local sections agreeing on overlaps."

### 2.3 The four-corner cell and Charge

Two independent Boolean facts about one `Utterance` (has its token been articulated? has its claim?) generate exactly four cells, named and proved exhaustive (`Articulating.Corner`, `Articulation/Articulating/Cell.lean:44-53`, proven `card_eq_four` per that file's header):

| corner | token art. | claim art. | reading |
|---|---|---|---|
| `absurd` | no | no | neither side articulated |
| `active` | yes | no | next on the natural path |
| `stable` | no | yes | claim without token |
| `absurd` | yes | yes | both sides articulated |

Root `CLAUDE.md` records that this cell conflates, as one recurring coherence cell, with the Belnap-style charge quartet {⊥, t, f, ⊤}, the nuclear quartet {free, j₁-fix, j₂-fix, both}, the modal quartet {neither, ◇, □, both}, and the regime quartet {strict, Scott, transfinite-bounded, aperiodic} (`QuartetRecurrence`/`FourCornerCell`, cited, not independently re-opened this session).
Under that conflation, `absurd` (both sides articulated) reads as ⊤/`both` — the corner that **holds** two things at once rather than resolving to one.
This is the exact corner §6 below identifies with held domain polysemy.

### 2.4 Regime

`Infomaterial/Closure/Regime.lean` proves an explicit four-way classification of how a closure process behaves (`inductive ClosureRegime`, lines 47-50, verified this session):

```
strict | scott | transfiniteBounded | aperiodic
```

with a decidable classifier (`classify`, lines 75-82): strict if the base is finite, else Scott if the closure is Scott-continuous, else transfinite-bounded if its cofinality is countable (ω < κ < ω₁), else aperiodic.
The regime line runs strict < scott < transfiniteBounded < aperiodic in exactly that ordinal sense (κ<ω, κ=ω, ω<κ<ω₁, κ≥ω₁ respectively — `Closure/Regime.lean:17-20`); this paper reads it as one ordinal-valued coordinate component (§4.3.3).

## 3. What the corpus claims about registers, and what's actually settled (note 1, summarized)

Note 1 is this paper's evidentiary backbone; this section states only what it needs for the formalization in §4-§6, at the maturity tag note 1 itself assigns.

**N1 (register-topic conjecture).**
Registers are realizable as `Topic`s over the corpus's own `TermContext`, so register assignment is `generatedConcept ⊑` a register topic's intent — computed, not judged.
**Status: open.**
A same-day attempt to measure this empirically (note 1 §9) was deleted 2026-07-05 as unreliable; its numeric findings are not cited here and should not be relied on elsewhere.

**N2 (forcing conjecture).**
Register-eligibility is invariant-determined: a candidate invariant is stated per register (processual ↔ carries a `Trace` fold; substantial ↔ retrospective head/floor readout; kinematic ↔ arises by the K construction; dynamic ↔ closure sequence with a regime signature; geometric ↔ cover/patch/overlap structure; algebraic/analytic ↔ the metallization dichotomy; relational ↔ incidence/effect relation with proven closure laws).
**Status: open**, for the same reason as N1.

**N3 (morphology conjecture).**
Derivational morphology (-izable, -ized, -ization, agent nouns) is an operator calculus with the four-corner cell as its modal core.
**Status: open — one instance (-izable = ◇) is ruled** (note 2, 2026-07-03 session: "-izable is the ◇ corner of the modal reading of the four-corner cell"; the general claim is unproved, note 1 §6/§10).

The load-bearing distinction for this paper, independent of N1/N2's open status: **a vote landing in the predication spine means "spine-deep only, not yet registered," not "unregistered/unnamed."**
Every base verb (articulating/predicating/positing/settling) is a *filtration depth* all material passes through — orthogonal to register, not a register itself.
This governs how §4.3 handles the "spine depth" coordinate: it is never read as a register vote.

## 4. Corrections to the seed

The session that produced this paper's brief handed down a formalization to check against these primaries.
Two parts of it did not survive the check as literally stated; both are corrected here rather than silently used.

### 4.1 `generatedConcept` takes one term, not a pre-unioned pair

The seed stated:

> Intension: I(S_o) := cl( P(S) ∪ C(o) ) (FCA closure; Galois, hence monotone) Determined concept: c(S_o) := generatedConcept( I(S_o) )

This presumes `generatedConcept` accepts an already-built, already-closed intension — a union of "the structure's own proven claim profile" P(S) and "this occurrence's own consumption profile" C(o) — as an external argument.
It does not.
Per §2.2, `TermContext.generatedConcept C t` takes a single **term** t and derives its profile *internally*, in one step, as `fun q => C.incidence q t` (`Site/Intension.lean:73-78`).
There is no operation in the live Lean that separately closes a structure-level profile and an occurrence-level profile and unions the two before a second closure — every term gets exactly one profile from exactly one incidence relation.

**The corrected statement:** model an occurrence S_o *as* one term t_o in a term context C (not as a structure S plus an occurrence o combined after the fact).
Its intension is `profile(C, t_o)` and its determined concept is `generatedConcept(C, t_o)` — one call, matching the proved theorems exactly.
The real distinction the seed was reaching for — a structure's *proof-level* claim profile versus one *occurrence's* code-level consumption profile — survives, but it lives **outside** this Lean module, in the choice of *which* `TermContext` (which incidence relation) is built for a given measurement:

- N1's target incidence is proof-level: `incidence q t` should hold when a *proven claim* q constrains a *named term* t (the blueprint's `\uses` claim graph).
  This `TermContext` is not yet built at declaration granularity (note 1 §9, open question
  1) — until then it can only be assembled by hand.
- A weaker, module-granularity incidence (consumed declarations rather than proven claims) would still fall short of N1's target even if measured cleanly — it would measure consumption, not proof-constraint.

So "P(S) ∪ C(o)" was gesturing at a real fact (two candidate incidence relations exist, at two different granularities, and neither is quite the other), stated as if it were one formula inside a single fixed `generatedConcept` call. §4.3 below fixes Λ(S_o) to the *measured* incidence (consumption-based, module-granularity today) and flags every component that would sharpen once the *proof-level*, declaration-granularity `TermContext` exists.

### 4.2 "Proper" conceptualizability is a conjecture, not a proven fact

The seed asserted: "conceptualizability := ◇(conceptualized) := generatedConcept(I(S_o)) is proper (strictly between lattice top and bottom)."
No theorem in `Site/Intension.lean` or `Calculus/Order/FormalConceptAnalysis.lean` establishes this in general, and it is not generically true: a term with an empty direct profile generates the top concept (extent = everything, by vacuous implication in `primeB`), which is not proper.
The Lean only proves that a term lies in its own generated concept's intent (`generatedConcept_in_intent`, §2.2) — a containment fact, not a properness bound.
**Corrected tag: properness of any *particular* generated concept is a claim to check per-occurrence, not a theorem the corpus has proved in general — conjecture, carried over from the operator's gloss on "tokens are earned by settlement" (memory: `names-are-readouts`), not from Lean.**

## 5. Λ(S_o): the lexical coordinate vector

Λ(S_o) is a tuple, one component per measurable invariant.
It is coordinates, not a name: **two occurrences with equal Λ are the same structure-in-the-same-position, whatever either is currently called.**
Per the naming discipline that governs every other coinage in this corpus, Λ itself earns a name only once it is built and proves something — none is coined here.

| # | component | value space | instrument (today) | maturity |
|---|---|---|---|---|
| 1 | generated-concept position | a concept (extent, intent) pair in the corpus's claim/term concept lattice | by hand from the blueprint claim graph (proof-level `TermContext` not yet built) | proven mechanism (§2.2), **research-grade** as a per-occurrence measurement |
| 2 | RMN generator fingerprint | a finite set: which term-formers/generators/charge-ops (`joinK/meetK/joinT/meetT`, `negate/conflate/negConf`) an occurrence's RMN body uses | direct read of `metroplat/lib/language/index.mts`-typed bodies | **measured**, available today for any term with an RMN body (note 1 §7.2) |
| 3 | regime signature | ordinal: strict < scott < transfiniteBounded < aperiodic | `Closure/Regime.lean`'s `classify` (§2.4) | **proven** classifier; per-occurrence application is **measured** case by case |
| 4 | spine depth | ordinal: articulating < predicating < positing < settling | which base-verb layer's structures an occurrence consumes | **measured** — this axis predicts *nothing* about register: a vote landing at predicating depth means "spine-deep only," never "unregistered." This component is not in note 1 §7's nine-item list; it is added here from the CLAUDE.md spine and flagged as an addition, not inherited |
| 5 | four-corner position | one of {potential, active, stable, absurd} (§2.3) | which corner's conditions an occurrence's own articulation status satisfies | **proven** cell structure; per-occurrence placement is **measured** |
| 6 | H¹ obstruction rank | a non-negative integer (graded-gap = H¹ identity) | `SettlingCohomologyH1` (cited from note 1, not reopened this session) | **research-grade** here (inherited citation) |
| 7 | substance-rung support | ordinal ladder: tile < bead < crystal < quasicrystal < … < hole | `Relational/Material/Glass.lean` spine (cited from note 1, not reopened) | **research-grade** here (inherited citation) |
| 8 | readout-pair membership | boolean: does the occurrence carry both a substance-like and a process-like readout, jointly onto | `head_moved_joint_onto` pattern (`Articulating.head`/`Articulating.moved`, cited from note 1, not reopened) | **proven** (per note 1), **research-grade** as applied here |
| 9 | K-level | ordinal: number of `HoleDiamondKinematicSpace` applications above ground | cited from note 1, not reopened | **research-grade** here |
| 10 | metallization side | algebraic (chromatic residue closes at every grade) vs. transcendental (never finitely stabilizes) | `MetallizationDichotomy.lean`, cited from note 1, "proven at the finite classifier level" | **research-grade** here (inherited citation) |
| 11 | register vote | one of the corpus's earned registers, or UNREGISTERED | distinctiveness-weighted majority vote over consumed foreign structures | **open** — no trustworthy per-register data currently exists; read a predicating-spine vote as unregistered, never as "this register" |

Components 1–5 and 11 were checked against a primary this session; 6–10 are carried from note 1's own citations, at the "research-grade, inherited" tag §0 states, and should be re-verified before any load-bearing use.

Two disclaimers state plainly what Λ is not:

- **Λ is a position, not a verdict.**
  Equal Λ does not mean two occurrences *should* share a name — it means whatever names they get should be sections over the same fiber (§6).
  Different registers legitimately assign different anchors to one concept; that is lawful polysemy, not an error Λ is meant to erase.
- **Component 11 has no trustworthy data.**
  No module- or declaration-granularity precision figures exist to cite for register voting.
  A hand-verified instrument (using `lean_verify`'s axiom/dependency output as the incidence relation instead of textual structure reference) is the natural next step, specified for metroplat's TypeScript tree in the Appendix below — but its output must be spot-checked against real declarations before any aggregate number from it is trusted.

### 5.1 Addendum 2026-07-07: least-loss register readout

The table above measures position.
It still leaves a normalization decision: which register captures the occurrence with the least loss?
The answer is not the most evocative word and not the broadest software category.
It is the register lens whose structures, obligations, and failure modes are actually present in the occurrence's measured profile.

Current working lens basis, to be tested rather than assumed:

| lens | what it must read without loss | current evidence grade |
|---|---|---|
| physical/material | phase, underlying type, causal/kinematic region, regime, H¹, K-level, hole/shroud/plate anatomy | live Lean and TypeScript structures; per-occurrence applications still need measurement |
| computing/term | RMN term shape, CHL typing/evaluation, contract move, codec/projection/action surface | live RMN/CHL/action/witness code; many bodies still ordinary TypeScript closures |
| semiotic/intensional | claim/term incidence, generated concept, topic-local reading, anchor, register fiber | live `TermContext`/`Topic`/`TermReading` machinery; corpus-wide incidence still open |
| ludic/game | answerable move, strategy, cut, arena `(E, <=, #)`, conflict, uptake, authority/standing | strong quarry and FeltOS realizations, live FOUR/Chu absorption in metroplat; full metroplat CGS/ludics formalization open |

This changes the use of Λ in one practical way.
A candidate name is now checked by a two-stage read:

1. compute or hand-measure Λ(S_o), including the unit shape being named (processual move, answerable move, event, term, underlying type, region, arena, face, lens, witness row);
2. score each lens by structure overlap and obligation satisfaction: exact structure consumption beats analogy, proven theorem beats named resemblance, witnessed projection beats documentation, and an explicit preserve/hide lens beats a face that merely returns a similar payload.

The least-loss lens supplies the register in which an anchor may be chosen.
A tie between independently earned lenses is not a problem; it is lawful polysemy, one anchor per register.
A tie inside one lens is unlawful aliasing.
A beautiful word with no structure overlap is connotation and must fall into §7's fourth bucket.

## 6. The fibration — set up, not solved

**Base.**
Let the base space be the corpus's own concept lattice: the set of concepts c generated (§2.2) by closing some term's direct profile in a `TermContext`.
Every occurrence S_o maps to a point in this base via c(S_o) := generatedConcept(C, t_o) (§4.1's corrected form).

**Fiber.**
Over a concept c, the fiber is the set of *anchors* available for it: one candidate per register that has actually earned an incidence-based identity (which registers those are is currently open — see §3), filtered by the admission/refusal stratum note 2 already rules — settlement-register words describing **morphology** are admitted; words describing **institutions** (governance, subordination, empire) are refused, with a recorded refusal table (colony, metropolis, central place/satellite, district/ward/municipality, outpost, frontier — note 2, "Refused, with cause").
An "instrument register" (a module that reads every other register's structures without having its own — Cohomology is the suspected example, unconfirmed) would not contribute an anchor by this construction, but whether N2 holds or fails for such registers is itself open, pending a real measurement.

**Section.**
Naming an occurrence is choosing, for each site, one anchor from the fiber over its concept — a **section** of this fibration over the site of occurrences (the same `Site`/`Topic`/cover machinery §2.2 already proves patches locally and glues on overlaps, `TermReading.coverRestriction_overlap_terms_agree`, `Intension.lean:206-213`, proven).
A section is lawful exactly where it **glues**: where two occurrences' covers overlap and their consumption profiles agree, the sections chosen for them must agree on which anchor to pick.

**Failure to glue is domain polysemy, held, never resolved.**
Per §2.3, the corpus's own four-corner cell reads "both sides articulated" (`absurd`) as the ⊤/`both` corner — the reading that **holds** two facts simultaneously rather than collapsing to one.
A gluing failure — two valid anchors for one concept, neither dominating — is read the same way: held as data (a real, checkable ⊤), never silently resolved to one winner.
This matches note 2's own distinction exactly: *aliasing* (two anchors for one concept in **one** register) breaks the naming-as-function law and is unlawful; *polysemy* (anchors in **different**, each independently earned registers) is lawful, forced, and exactly one per earned register.

**Maturity, stated plainly: this entire section is a conjecture chaining onto note 2's already-open genus-identification work** (`obsticulation`/`obstruence`, red-node, "intension carried, genus-identification open" per the 07-05 campaign plan's own ontological-dependencies table).
Nothing here claims a sheaf-cohomology theorem about the lexicon; it claims that the *structures already proved* for topic/cover/gluing in §2.2 are the right shape to state one, once someone does the work of proving gluing failure is exactly what a nonzero H¹ on this particular site computes.
That proof does not exist yet.

## 7. Three exits, once c(S_o) and R(o) are fixed

Given a determined concept c(S_o) and a register vote R(o) (component 11 — currently open, no trustworthy instrument exists, see §3), computing the determined name D(S_o) := anchor_R(o)(c(S_o)) has exactly three lawful exits:

1. **Anchor exists in R(o).**
  Use it.
  No alias, no synonym introduced alongside it.
2. **Anchor exists only in another register R' ≠ R(o).**
  A coinage obligation, not a free choice: the new anchor's *shape* is fixed by the morphology operator calculus (N3, §3), so far checked for exactly one case — `-izable` = ◇ (existence-without- choice, mintable before its own characterization theorem, per note 2's "conurbanizable" worked instance).
3. **No anchor anywhere.**
  An unnamed concept.
  It earns a name when built and proving something — never before, per the standing naming discipline this repository already enforces on every other coinage.

A fourth outcome is not a lawful exit but a decidable pathology, stated in note 1 §4 and restated here in the vocabulary of §2.2: a term t is **applied by connotation** when its intent (the closed attribute-set its generated concept carries) is not contained in — worse, in the strong cases below, does not even overlap — the occurrence's own measured intension.
Concretely: t applied at o is connotation exactly when I(t_o) ⊉ intent(c(t)) for the t whose word is being borrowed.
This is the negative control note 1 §4 already ran (aperiodic-tagged files: ~40% carry real Salem/Pisot/tiling math, the rest carry only the label; transfinite-bounded "never actually filled"; "spinning" names three unconnected things) — any instrument implementing §7's three exits must be able to *fail* an occurrence into this fourth bucket, or it is theater, exactly as note 1 §4 states of the register-assignment program generally.

## 8. Worked examples

Three occurrences, computed by hand from the code read in §0 — not from this paper's own prompt, which stated a claim for each that had to be checked against the source and is confirmed or corrected below.

### 8.1 The witness deposit path vs. generic file I/O in the same service tree

`lib/emsenn/src/apps/metroplat/lib/persistence/index.mts` defines, and nothing else in the file imports or wraps: `WitnessRow`/`WitnessTuple` (the four-field E/A/V/T structure), `WitnessTier`/`witnessTier` (the four named tiers log/state/record/content with rank, `mayForget`, `preserves`), `witnessIdentity`/`canonicalWitnessValue` (the deterministic address of a witness row), and `utteredClaimIdentity` (deriving a predication cell and canonical address from a token and claim-mark, never accepting a caller-supplied address string).
Its own header states its domain exactly: "This stratum owns the pure row shape of relation-witness time.
It does not know JSONL, files, hashes, SSE, or HTTP."
Every one of these is consumed, directly, by `services/filesystem-store/index.mts` (imports `witnessStoreAppendAddress`, `witnessStoreLogArtifact`, `witnessStoreRecordArtifact`, `witnessStoreStateArtifact`, `contentStoreConfinedPath`, etc. — structures built on top of exactly the persistence module above).
I(S_o) for the witness deposit path therefore includes the witness tier structures, the witness-row identity law, and the canonical-address derivation — placing it squarely in what note 1 calls a candidate **forced subject register** (persistence/plate) — no numeric precision figure is cited for this, on either the Lean or TypeScript side, since no trustworthy measurement of that kind currently exists (§3).

Contrast: `services/filesystem/index.mts`, in the **same top-level `services/` directory tree**, a few directories over — its own header: "shared host filesystem effects" — `pathExists`, `readDirectoryEntries`, `walkFiles`, atomic writes, file locking.
Grepped this session: zero references to `WitnessRow`, `witnessTier`, `witnessIdentity`, or `canonicalWitnessValue` anywhere in that file.
Its consumption profile is Node's own `fs`/`readline`/`path` and nothing from the persistence stratum at all.
Its I(S_o) is empty with respect to every structure persistence's register requires.

**This is the domain gate, concretely, and by consumption, not by directory.**
Being in `services/` — even being one directory-hop from the module that *does* wire witness structures into disk — does not, by itself, place an occurrence in the persistence register.
`services/filesystem-store` sits in the register because it *consumes* `lib/persistence`'s structures; `services/filesystem` sits in a different, host-boundary position because it consumes none of them, despite living in the same parent directory and being a dependency the witness-aware store module itself calls through.

### 8.2 The "goals" classifier at `session.mts:930-1046`

The prompt this note was written from asserted: "the 'goals' classifier... sit[s] nowhere near the goal concept's [coordinates] (no target-history claim, no commitment claim consumed)."
Checked this session: grepping `lib/calculus`, `lib/closure`, and `src/capability` for `Goal`, `commitment`, `target-history`, `targetHistory` returns **zero** structure/inductive/class declarations and zero named terms anywhere in the metroplat TypeScript tree.
The only surface-level occurrence of the word "goal" outside this classifier is a plain display field, `session["latestGoal"]` (`services/state-cuts/index.mts:1789`), sliced to 160 characters for a status cut — not a term, a display string.

Reading the classifier itself (`session.mts:937-1046`): `objectiveTexts` regex-matches `<objective>...</objective>` tags and lines starting with `/goal `; `obligationTexts` regex-matches lines starting with a bullet whose text contains `must|required|obligation|do not|only after|before proposing|verify with|close the loop|remains unearned`; `chronicleWorkReadFromChronicle` treats *any* host-declared `boundaryEvent === "user"` utterance, unconditionally, as a `role: "goal"` item — no claim structure, no commitment structure, no target-history object is read or constructed anywhere in this path.
I(this occurrence) is, with respect to any formal "goal" concept, **empty**: there is no `Goal` term anywhere in the corpus's own `TermContext` for this occurrence's profile to intersect, because no such term exists yet.

**Verdict, from the code, not from the prompt's assertion (which is confirmed): this is a coordinate mismatch, not a matter of opinion.**
The occurrence's own measured profile is {string-matches-a-regex, is-inside-a-tag, starts-with-a-bullet-prefix} — attributes that generate a concept with no proven claim in it at all, because `chronicleWorkReadFromChronicle` consumes no claim structure whatsoever.
Calling its output "goals" is, per §7's fourth bucket, connotation in its strongest form: not merely insufficient overlap between I(o) and intent(concept("goal")) but **zero** overlap, because concept("goal") has no anchor to overlap with in the first place (§7 exit 3: this is presently an unnamed concept, if a concept at all — the word "goal" is being used as ordinary English, not as a claimed term of this corpus's own register system, and should not be read as one).

### 8.3 "deshrouded" vs. the proven `Shroud` predicate

`Infomaterial/Relational/Spacetime/Boundary/Hole.lean` proves `Shroud C readout x := HoleRegion C readout x && C.events.any (fun y => ReadoutExterior C readout y && CausalAdjacent C x y)` (line 213) — a hole-interior event **causally adjacent** to a readout-exterior event.
Its consumption profile, read in full this session: a finite `CausalSet E`, a `CausalLeDecision` (a Boolean presentation of the proven causal order), a `Region E` readout predicate, and `CausalAdjacent` (Boolean either-direction causal precedence).
Every theorem about `Shroud` (`shroud_in_hole`, `shroud_has_exterior_neighbour`, `shroud_has_exterior_predecessor`, all proven) is stated over these exact structures.

`lib/closure/analysis/session-presence.mts` defines `PresenceState = "deshrouded" | "settled"` and computes it as: `settled` iff a `SessionEnd` hook event was witnessed for that session, else `deshrouded` (line 77: `state: settled ? "settled" as const : "deshrouded" as const`).
Read in full this session: the module's own consumption profile is `RunObservation` (a hook-event row: session id, hook event name, timestamp), a Boolean flag flipped by string-matching the event name against `"SessionEnd"`, and a max-timestamp fold.
**Zero** references to `CausalSet`, `Region`, `ReadoutExterior`, or `CausalAdjacent` anywhere in this file or its caller (`services/session-presence/index.mts`).
I(this occurrence) does not overlap `Shroud`'s consumption profile at all.

The module's own docstring is unusually honest about what it is doing and is worth quoting in full because it changes the verdict's character: "Absence of `SessionEnd` is never proof of life... deshrouded, exactly the same shape a live turn takes while its `Stop` has not yet been witnessed" (`session-presence.mts:6-8`).
This states the borrow is a **shape analogy** (an open interval with no upper endpoint yet, matching `Hole`'s no-readout-yet structure at the level of narrative, not of causal-adjacency math) and explicitly disclaims that recency evidence is life evidence.
That is a materially different act from §8.2's classifier, which asserts no such caveat about its own "goal" label.

**Verdict, computed, not asserted:** by the strict test of §7's fourth bucket (I(o) ⊉ intent(concept("Shroud"))), this is connotation — the occurrence consumes none of `Shroud`'s causal-adjacency machinery.
It is not exact use (§7 exit 1: no `Shroud`-carrying claim is present to anchor to), and it is not a coinage obligation in N3's sense either, because "deshrouded" was not minted as a new word — it borrows an existing proven predicate's name for an unrelated Boolean.
The mitigating fact, stated plainly rather than smoothed over: the borrow is *declared* as analogy in the module's own prose, at the exact point of use, rather than presented as identity.
That makes it a better-behaved instance of the same pathology note 1 §4 already found at ~60% of aperiodic-tagged files (label without invariant) — self-aware connotation, not undisclosed one — but it is connotation, not exact use, by the coordinate test, and the open question the prompt posed is answered: **no coinage obligation is owed here, because the shared word already carries an honest disclaimer; what is owed, if anything, is either dropping the borrowed word for a plain one ("open"/"unclosed") or building the actual causal-adjacency structure this module's own docstring gestures at and has not built.**

## 9. Appendix — instrument specification (for a follow-on to build; no code here)

**Objects.**
Modules under the metroplat TypeScript tree (`lib/`, `src/`, `services/`) today; declarations (named exported functions/types/interfaces) as the natural next granularity, mirroring note 1 §9's own open next step ("declaration-level rerun... using `lean_verify`'s axiom/dependency output as the incidence relation instead of textual structure reference" — the TypeScript-tree analogue of that dependency output is each symbol's own import graph, already indexed by `services/module-topology` per this package's `AGENTS.md`).

**Attributes.**
Consumed structures: imports of structure-defining modules (structures, interfaces, and named type exports that themselves define a proven or load-bearing shape — `WitnessRow`, `WitnessJournalTier`, `CausalSet`, `Region`, `Cell`, etc.), read from **comment-stripped code only**, with `import`/re-export lines excluded from the attribute count itself (an import is what makes a reference *possible*; the reference inside the function body is what makes it *consumed*): strip block and line comments first, drop declaration/import/namespace boilerplate lines, then match structure names as whole-word occurrences in what remains.
(An earlier attempt at this exact design was deleted 2026-07-05 for producing unreliable results on the Lean tree without hand-verification — see §3 — so any new instrument built from this spec must be spot-checked against real declarations before its output is trusted, not just before it is published.)

**Ground truth.**
The term ledger — i.e., wherever this corpus's own named terms are declared as such (interfaces/types marked as terms by this package's own convention, e.g. `kind: "metroplat...."` discriminant literals, which this codebase already uses pervasively as a lightweight term tag) — not directory placement alone, since TypeScript directory structure is looser than the Lean tree's namespace discipline.
Where a `kind` discriminant exists, it is a stronger ground-truth signal than the directory path and should be preferred.

**Outputs, per occurrence:**

1. The coordinate vector Λ(S_o), or as many of its eleven components as the TypeScript-tree analogues of §5's instruments can compute (components 1, 2, 3, 5, and 11 are directly portable from the Lean-side design; components 6–10 require locating or building TypeScript-side analogues of `SettlingCohomologyH1`, `Glass.lean`'s ladder, `HoleDiamondKinematicSpace`, and `MetallizationDichotomy` — not assumed to exist and not claimed here).
2. The three-exit classification of §7, plus its fourth bucket (connotation) — emitted with the actual overlap computation (I(o) ∩ intent(concept(t)), not a yes/no), so a human reviewer can see *how much* mismatch drove a connotation verdict, per note 1 §4's own standard ("40% carry real math, the rest carry only the label" was a **quantified** finding, not a binary one).

**What an honest instrument must do, learned from the deleted attempt's failure (§3), restated as requirements:**

- **FAIL files.**
  An occurrence whose consumption is too thin to place (e.g. it consumes only the predication spine, per §5 component 4) must report "unregistered," not guess a register.
  Silence-as-confidence is the exact failure this whole program exists to catch.
- **Report precision, per register, not one aggregate number.**
  A register with high precision and one with low precision must never be presented behind one blended accuracy figure.
- **Refuse to assign into unearned registers.**
  A register with no term identity of its own gets no votes cast into it, ever, until it earns one — the instrument must encode this as a hard refusal, not a low-confidence guess.
- **Exclude same-name foreign declarations from the attribute set, or verify they can't collide.**
  The deleted attempt counted the corpus's own `structure Nat` (an unrelated categorical construction in `Language/Predicating/YonedaArrowsFirst.lean`) as "the" term named `Nat`, so every file using ordinary `Nat` registered a false reference to that one file.
  Any new instrument must check for and exclude this class of collision before trusting its output.
- **No silent caps.**
  If the instrument samples (top-N modules, a time budget), it must log exactly what was excluded and why, per this corpus's own standing discipline against undisclosed truncation.

This specification does not include a schema, a file layout, or a script — per the task discipline governing this note, that is a follow-on's work, once this note's Λ-vector and three(-plus-one)-exit classification are read and checked, the same way this note checked note 1's.

## 10. Status and open questions

- **Stage one (Λ, §5) is a mix of proven mechanism (FCA closure, the four-corner cell, the regime classifier) and measured-but-not-re-verified-this-session citations (components 6–10) — not a finished instrument.**
  No code was written; §9 is a specification for one.
- **Stage two (the fibration, §6) is conjecture, explicitly chained onto note 2's open `obsticulation`/`obstruence` genus-identification work.**
  It is not claimed as a theorem anywhere in this note.
- **The granularity caveat carries forward unchanged from note 1 §9:** every module-level "measured" tag in this note inherits the same open question — does term/declaration-level forcing sharpen or dissolve the module-level profile?
  Not answered here.
- **§8.3's verdict is a real, checked answer, not a placeholder**: "deshrouded" is connotation, self-aware and honestly disclaimed in its own module's prose, and the live open item it leaves is a plain choice (rename to ordinary English, or build the causal-adjacency structure the name gestures at) — not a mathematical question this note needs to hold open.
- **What this note did not attempt:** N3 (the morphology operator calculus) beyond the one already-ruled `-izable = ◇` case; a second-order invariant for instrument registers (note 1 §10, still open); any claim about whether the Topic/Concept/Term naming-law coincidence (note 1 §2) is design or convergence.
