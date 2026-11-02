---
name: Term
aliases:
  - terminological term
description: "A term is a designation that a community uses for a concept within a bounded domain. The designation, concept, and carrier that records their association are distinct things."
references:
  dahlberg1978:
    authors: [Ingetraut Dahlberg]
    title: "A Referent-Oriented, Analytical Concept Theory for INTERCONCEPT"
    publication: "International Classification 5(3), 142–151"
    year: 1978
---

A **term** is a designation—a word, phrase, symbol, or other communicable
expression—used for a concept by a community in a bounded domain. A term makes
the concept discussable; it is not identical to the concept, its referent, or
the Markdown or database record that documents the designation–concept
association [@dahlberg1978].

A **name** is a designation used to identify an entity. A term may function as
a name, but terminology also includes designations for repeatable concepts such
as processes, qualities, and relations. An **alias** is another admitted
designation for the same concept in the same glossary scope; it is not another
concept merely because its spelling differs. A **keyword** is a retrieval or
composition key attached to a carrier. It may happen to be a term identity, but
its indexing role does not make it the designation being defined.

A **concept** is the unit of knowledge the community distinguishes. In
Dahlberg's referent-oriented analysis, characteristics contribute to that
concept while a designation makes it communicable. Formal concept analysis
uses *formal concept* for a closed extent–intent pair derived from an incidence
relation. That construction can expose candidate conceptual structure, but it
does not decide which designation a community should use and does not make a
designation identical to a formal concept.

A **relation** or **predicate** asserts how subjects, objects, concepts, or
carriers are connected. A term can designate a relation, and a term record can
carry relation assertions, but neither fact makes every term a relation. The
relation assertion belongs to the record's semantic data; provenance, dates,
and citations instead state why and when the record is warranted.

A **term record** is the information object that associates a carrier identity,
the admitted name and aliases, a defining body, citations, provenance, and
semantic relations. The paired
[science schema](../../../../schemas/glossary/terms/term.schema.json)
specifies that record. A Markdown file is one possible carrier of such a
record, not the term itself.

Mathematics uses **formal term** for a well-formed syntactic expression of a
formal language. Lambda terms are generated from variables, abstraction, and
application; other signatures have other formation rules. This is a distinct,
domain-qualified sense documented at the
[mathematics science seat](../../../../../../../../../math-services-section/content/text/glossary/terms/formal-term.md).
