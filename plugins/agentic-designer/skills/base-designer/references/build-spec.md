# Build Spec (designer, for their own build). YAML, deterministic, manifest IDs only.
```yaml
screen: Transfer / Input Amount
platform: ios-390            # shell id from the manifest
golden: golden/mobile-transfer-confirm   # golden screen it inherits from
deviations: [ "amount hero larger than golden (Display M)" ]
sections:
  - id: header
    component: NavigationBar/large   # manifest component name
    props: { Title: "Transfer" }
  - id: recipient
    container: { fill: surface/primary, radius: radius/lg, px: space/400, py: space/300, gap: space/200 }
    children:
      - component: ListItem/avatar
        variant: { Size: md }
        props: { Title: "Dev Wijaya", Subtitle: "BCA •••• 4417" }
  - id: amount
    gap_after: space/600            # spacing map tier T2/T3 as tokens
    children:
      - text: { style: Display/M, color: text/primary, content: "Rp0" }
  - id: cta
    component: Button/primary
    variant: { Size: lg }
    props: { Label: "Lanjut" }
states: [ default, error-insufficient, keyboard-up, loading ]   # ≤ 5 hi-fi
new_patterns: []   # NEW-PATTERN items need Jarvis+Desi approval before build
```
Every element references a manifest component, token, or text style. Anything without a match goes to
`new_patterns` with a one-line justification.
