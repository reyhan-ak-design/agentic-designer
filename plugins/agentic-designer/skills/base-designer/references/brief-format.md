# Brief format

Pram (PM) produces briefs in this format. The Manager may also write one directly.

```
Screen       : <name, e.g. Transfer — Input Amount>
Project      : <client / product name>
Domain       : <finance | insurance | healthcare | government | ngo | ecommerce | retail | ...>
Platform     : <iOS | Android | Web> + frame size (e.g. 375×812)
Style Pack   : <style name, or "designer's choice">
User goal    : <one sentence>
Must-have    : <content and functions that must exist>
Nice-to-have : <optional>
States       : <list, or "all">
Constraints  : <technical, business, legal, brand>
Audience     : <who + moment of use, e.g. 'commuter paying on the go, one hand'>
Feel         : <3 words, e.g. 'warm, quick, confident'>
References   : <2–3 links/screenshots the Manager likes> + what to take from each
Signature    : <idea, or 'designer proposes'>
Images       : <uploads in _assets/ | Unsplash ok | illustration only | AI generation ok>
Lane         : <Quick | Standard | Explore | Flow | DS Maintenance>
Figma target : <file link + page name to work in>
```

## Must-have fields (Jarvis's brief gate)
Platform + frame size, user goal, must-have content, Figma target, **audience + moment, 3 feel words, 2–3 references**.
If any is missing: Jarvis asks the Manager **one** question offering defaults (or sends Pram to find references), then proceeds.

## Defaults when not given
- Style Pack: pick from the Domain Pack's recommended styles.
- States: default/empty, filled/valid, each error cause, loading, disabled, success/next step.
- Copy language: the language of the brief.
- Data: realistic for the market named in the Domain Pack.
