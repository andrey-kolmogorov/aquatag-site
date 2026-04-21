// Aquatag i18n — plain JS (loads with <script src>).
// Usage:
//   Put data-i18n="some.key" on any element you want translated.
//     Its textContent is replaced with DICT[LANG][key] on load + on language change.
//   Put data-i18n-html="some.key" for keys that contain inline HTML (em, br, etc).
//   Call window.t('some.key') in JS for runtime strings.
//   Call window.setLang('en'|'de') to switch.
//   Subscribe to changes with window.onLangChange(cb).

(function () {
  const DICT = {
    // ─────────── SHARED / NAV / CTAs ───────────
    'nav.how':          { en: 'How it works',    de: 'So funktioniert\u2019s' },
    'nav.characters':   { en: 'The characters',  de: 'Die Charaktere' },
    'nav.stickers':     { en: 'Stickers',        de: 'Sticker' },
    'nav.faq':          { en: 'FAQ',             de: 'FAQ' },
    'nav.how_short':    { en: 'How',             de: 'So geht\u2019s' },
    'nav.source':       { en: 'Source',          de: 'Quellcode' },
    'nav.cta':          { en: 'Get the app',     de: 'App laden' },
    'cta.download':     { en: 'Download on iOS', de: 'Für iOS laden' },
    'cta.view_source':  { en: 'View source \u2192', de: 'Quellcode ansehen \u2192' },
    'cta.view_source_gh': { en: 'View source on GitHub \u2192', de: 'Quellcode auf GitHub \u2192' },
    'footer.privacy':   { en: 'Privacy',          de: 'Datenschutz' },
    'footer.terms':     { en: 'Terms',            de: 'AGB' },

    // ─────────── SHARED DOC PAGES (privacy, terms, brand, design-system) ───────────
    'doc.nav.landing':  { en: 'Home',             de: 'Start' },
    'doc.nav.proto':    { en: 'Prototype',        de: 'Prototyp' },
    'doc.nav.back':     { en: '\u2190 Overview',  de: '\u2190 Übersicht' },
    'doc.toc':          { en: 'Contents',         de: 'Inhalt' },
    'doc.f.overview':   { en: 'Overview',         de: 'Übersicht' },
    'doc.f.landing':    { en: 'Landing',          de: 'Landingpage' },

    // ─────────── PRIVACY ───────────
    'priv.title':       { en: 'Aquatag — Privacy', de: 'Aquatag — Datenschutz' },
    'priv.eyebrow':     { en: 'Legal · Privacy policy', de: 'Rechtliches · Datenschutzerklärung' },
    'priv.h1.html':     { en: 'We store <em>nothing.</em>', de: 'Wir speichern <em>nichts.</em>' },
    'priv.lead':        { en: 'Aquatag is built to be the least-interesting app in your privacy audit. No account, no analytics, no servers we own. Your watering history never leaves your devices unless you deliberately sync it to your own Home Assistant.', de: 'Aquatag soll die langweiligste App in deiner Datenschutzprüfung sein. Kein Konto, keine Analytik, keine Server von uns. Dein Gießverlauf verlässt deine Geräte nur, wenn du ihn bewusst mit deinem eigenen Home Assistant synchronisierst.' },
    'priv.stat1':       { en: 'Accounts required, ever',    de: 'Konten erforderlich, niemals' },
    'priv.stat2':       { en: 'Third-party SDKs bundled',    de: 'Drittanbieter-SDKs enthalten' },
    'priv.stat3':       { en: 'Sent to servers we control',  de: 'An unsere Server gesendet' },
    'priv.toc1':        { en: 'Summary', de: 'Zusammenfassung' },
    'priv.toc2':        { en: 'On your device', de: 'Auf deinem Gerät' },
    'priv.toc3':        { en: 'Home Assistant sync', de: 'Home-Assistant-Sync' },
    'priv.toc4':        { en: 'App Store analytics', de: 'App-Store-Analytik' },
    'priv.toc5':        { en: 'Children', de: 'Kinder' },
    'priv.toc6':        { en: 'Changes', de: 'Änderungen' },
    'priv.toc7':        { en: 'Contact', de: 'Kontakt' },
    'priv.s1.h':        { en: 'The one-paragraph version', de: 'Die Kurzfassung' },
    'priv.s1.p1':       { en: 'Aquatag is an iOS app that records when you water your plants. It does that entirely on your phone using SwiftData (Apple\u2019s local database), protected by iOS sandboxing. We do not operate a backend. We do not collect analytics. We do not know you installed the app.', de: 'Aquatag ist eine iOS-App, die speichert, wann du deine Pflanzen gießt — vollständig auf deinem Gerät via SwiftData (Apples lokale Datenbank), geschützt durch das iOS-Sandboxing. Wir betreiben kein Backend. Wir erheben keine Analytik. Wir wissen nicht, dass du die App installiert hast.' },
    'priv.s1.callout.b':{ en: 'Last updated:', de: 'Zuletzt aktualisiert:' },
    'priv.s1.callout.t':{ en: 'October 2026. Version 1.0 of this policy. Material changes will bump the version and be announced in the app.', de: 'Oktober 2026. Version 1.0 dieser Richtlinie. Wesentliche Änderungen erhöhen die Version und werden in der App angekündigt.' },
    'priv.s2.h':        { en: 'What lives on your device', de: 'Was auf deinem Gerät liegt' },
    'priv.s2.p1':       { en: 'When you use Aquatag, the following is stored locally — in Apple\u2019s sandboxed app container, which only the app can read:', de: 'Wenn du Aquatag nutzt, wird Folgendes lokal im gesandboxten App-Container gespeichert, den nur die App lesen kann:' },
    'priv.s2.l1':       { en: 'Plant names, species, and the character you picked for each plant.', de: 'Pflanzennamen, Arten und der von dir gewählte Charakter je Pflanze.' },
    'priv.s2.l2':       { en: 'Watering interval (how many days between waterings) for each plant.', de: 'Gieß-Intervall (Tage zwischen Gießen) je Pflanze.' },
    'priv.s2.l3':       { en: 'Every watering event, including the timestamp and — if enabled — the device name that logged it.', de: 'Jedes Gieß-Ereignis mit Zeitstempel und — sofern aktiviert — dem Gerätenamen.' },
    'priv.s2.l4':       { en: 'A per-plant NFC tag identifier (the UID written to your physical sticker).', de: 'Ein NFC-Tag-Identifier je Pflanze (die UID auf deinem physischen Sticker).' },
    'priv.s2.p2':       { en: 'None of this data leaves the device unless you enable Home Assistant sync. Uninstalling the app removes it permanently.', de: 'Nichts davon verlässt das Gerät, solange du Home-Assistant-Sync nicht aktivierst. Deinstallieren entfernt alles endgültig.' },
    'priv.s3.h':        { en: 'Home Assistant sync (optional)', de: 'Home-Assistant-Sync (optional)' },
    'priv.s3.p1':       { en: 'If you connect the app to your own Home Assistant instance, each watering event is sent as a single authenticated REST call to the URL you entered. That\u2019s it. No telemetry, no analytics, no fallback to our servers (we have none).', de: 'Wenn du die App mit deiner Home-Assistant-Instanz verbindest, wird jedes Gieß-Ereignis als einzelner authentifizierter REST-Aufruf an die von dir eingegebene URL gesendet. Mehr nicht. Keine Telemetrie, keine Analytik, keine Rückfallebene auf unsere Server (die gibt es nicht).' },
    'priv.s3.p2':       { en: 'Your long-lived access token is stored in the iOS Keychain, which is hardware-backed and protected by Face ID / Touch ID. You can remove it from Settings → Home Assistant → Disconnect at any time.', de: 'Dein Long-Lived-Access-Token liegt im iOS-Schlüsselbund — hardwaregestützt, gesichert per Face ID / Touch ID. Jederzeit entfernbar unter Einstellungen → Home Assistant → Trennen.' },
    'priv.s4.h':        { en: 'App Store analytics', de: 'App-Store-Analytik' },
    'priv.s4.p1':       { en: 'Apple provides install counts and crash reports to every App Store developer. This is aggregate and anonymized by Apple — we cannot see individual users. You can opt out at any time in iOS Settings → Privacy → Analytics & Improvements.', de: 'Apple stellt jedem Entwickler aggregierte, anonymisierte Installations- und Absturzzahlen bereit — einzelne Nutzer sehen wir nicht. Jederzeit deaktivierbar: iOS-Einstellungen → Datenschutz → Analyse & Verbesserungen.' },
    'priv.s4.p2':       { en: 'We do not use IDFA, SKAdNetwork, or any other attribution framework. The app is shipped with App Tracking Transparency disabled because there is nothing to track.', de: 'Wir nutzen weder IDFA noch SKAdNetwork noch andere Attributions-Frameworks. App Tracking Transparency ist deaktiviert — es gibt nichts zu tracken.' },
    'priv.s5.h':        { en: 'Children', de: 'Kinder' },
    'priv.s5.p1':       { en: 'Aquatag is safe for any age — including the kids this app was made for. It does not collect personal information from anyone, so there is nothing to gate behind an age prompt.', de: 'Aquatag ist für jedes Alter unbedenklich — auch für die Kinder, für die wir die App gebaut haben. Es werden keinerlei personenbezogene Daten erhoben — keine Altersabfrage nötig.' },
    'priv.s6.h':        { en: 'Changes to this policy', de: 'Änderungen dieser Richtlinie' },
    'priv.s6.p1':       { en: 'If we ever change how this app treats data, this page will be updated, and in-app users will see a one-time notice on first launch after the update. We will not retroactively apply a new policy to data collected under an older one.', de: 'Wenn sich der Umgang mit Daten ändert, aktualisieren wir diese Seite und zeigen in der App einen einmaligen Hinweis beim ersten Start danach. Neue Richtlinien werden nicht rückwirkend auf bereits erhobene Daten angewendet.' },
    'priv.s7.h':        { en: 'Contact', de: 'Kontakt' },
    'priv.s7.p1':       { en: 'Privacy questions, data requests, or general correspondence: <a href="mailto:privacy@aquatag.app">privacy@aquatag.app</a>. We are a two-person studio and read every email.', de: 'Fragen zum Datenschutz, Auskunftsersuchen oder allgemeine Post: <a href="mailto:privacy@aquatag.app">privacy@aquatag.app</a>. Wir sind ein Zwei-Personen-Studio und lesen jede E-Mail.' },

    // ─────────── TERMS ───────────
    'terms.title':      { en: 'Aquatag — Terms', de: 'Aquatag — AGB' },
    'terms.eyebrow':    { en: 'Legal · Terms of use', de: 'Rechtliches · Nutzungsbedingungen' },
    'terms.h1.html':    { en: 'Be <em>kind</em> to your plants.', de: 'Sei <em>nett</em> zu deinen Pflanzen.' },
    'terms.lead':       { en: 'The legal stuff, kept short. Aquatag is a small iOS app and a small box of stickers. There is no subscription, no account, and no cloud we operate. The terms below describe how we ship the app and the physical kit, and what we each agree to when you use them.', de: 'Das Rechtliche, kurz gehalten. Aquatag ist eine kleine iOS-App und eine kleine Kiste Sticker. Kein Abo, kein Konto, keine Cloud von uns. Die folgenden Bedingungen beschreiben, wie wir App und Kit ausliefern und was wir beide bei der Nutzung vereinbaren.' },
    'terms.toc1':       { en: 'Accepting', de: 'Zustimmung' },
    'terms.toc2':       { en: 'The app', de: 'Die App' },
    'terms.toc3':       { en: 'The stickers', de: 'Die Sticker' },
    'terms.toc4':       { en: 'Home Assistant', de: 'Home Assistant' },
    'terms.toc5':       { en: 'Ownership', de: 'Eigentum' },
    'terms.toc6':       { en: 'Warranty', de: 'Gewährleistung' },
    'terms.toc7':       { en: 'Liability', de: 'Haftung' },
    'terms.toc8':       { en: 'Governing law', de: 'Anwendbares Recht' },
    'terms.s1.h':       { en: 'Accepting these terms', de: 'Zustimmung zu diesen Bedingungen' },
    'terms.s1.p1':      { en: 'By installing the Aquatag iOS app or purchasing a sticker kit, you agree to these terms. If you don\u2019t agree, delete the app or return the kit within 30 days for a full refund — no questions, no forms.', de: 'Mit der Installation der Aquatag-iOS-App oder dem Kauf eines Sticker-Kits stimmst du diesen Bedingungen zu. Falls nicht: App löschen oder Kit innerhalb 30 Tagen zurücksenden — volle Rückerstattung, keine Fragen, keine Formulare.' },
    'terms.s1.b':       { en: 'Plain English promise:', de: 'Versprechen im Klartext:' },
    'terms.s1.t':       { en: 'If any of these terms feel unfair, email us. We\u2019d rather have a conversation than a dispute.', de: 'Falls dir etwas unfair vorkommt: schreib uns. Gespräch vor Streit.' },
    'terms.s2.h':       { en: 'The app', de: 'Die App' },
    'terms.s2.p1':      { en: 'Aquatag is licensed to you — not sold — for personal, non-commercial use on iOS devices you own or control. You may not redistribute the binary or extract the artwork for use in other products. The source code is published on GitHub under the MIT license; the sticker artwork is not.', de: 'Aquatag wird dir lizenziert — nicht verkauft — zur persönlichen, nicht-kommerziellen Nutzung auf iOS-Geräten, die dir gehören oder die du kontrollierst. Du darfst die Binärdatei nicht weiterverbreiten oder die Grafiken für andere Produkte entnehmen. Der Quellcode liegt unter MIT-Lizenz auf GitHub; die Sticker-Grafiken nicht.' },
    'terms.s2.p2':      { en: 'The app is provided free of charge and will remain so. There are no paid tiers, no "pro" unlocks, and no forthcoming ones.', de: 'Die App ist kostenlos und bleibt es. Keine Bezahltarife, keine „Pro“-Freischaltungen, auch nicht geplant.' },
    'terms.s3.h':       { en: 'The sticker kit', de: 'Das Sticker-Kit' },
    'terms.s3.p1':      { en: 'Physical kits ship from the EU (currently Berlin). Standard shipping is 3–7 business days within the EU and 7–14 for international orders. We cover postage on orders over €50.', de: 'Physische Kits versenden wir aus der EU (derzeit Berlin). Standardversand 3–7 Werktage innerhalb EU, 7–14 international. Ab 50 € übernehmen wir das Porto.' },
    'terms.s3.p2':      { en: 'Stickers are waterproof, dishwasher-safe, and rated for outdoor UV exposure for 2+ years. If a sticker peels within 12 months of normal use, we\u2019ll replace it. If a T-flag stake cracks, same deal.', de: 'Sticker sind wasserfest, spülmaschinengeeignet und UV-beständig für 2+ Jahre im Freien. Löst sich ein Sticker binnen 12 Monaten bei normaler Nutzung, ersetzen wir ihn. Bricht eine T-Flaggen-Stake, genauso.' },
    'terms.s4.h':       { en: 'Home Assistant integration', de: 'Home-Assistant-Integration' },
    'terms.s4.p1':      { en: 'Home Assistant is an independent open-source project; we are not affiliated with it. Our integration uses their public REST API. If Home Assistant breaks their API, we\u2019ll update the app; we can\u2019t guarantee perpetual compatibility with every future HA release.', de: 'Home Assistant ist ein unabhängiges Open-Source-Projekt; wir sind nicht mit ihm verbunden. Unsere Integration nutzt die öffentliche REST-API. Bricht Home Assistant diese API, aktualisieren wir die App; dauerhafte Kompatibilität mit jedem künftigen HA-Release garantieren wir nicht.' },
    'terms.s5.h':       { en: 'Who owns what', de: 'Wem gehört was' },
    'terms.s5.p1':      { en: 'You own your watering data, your plant names, and your photos. We own the Aquatag name, the illustrated characters, the sticker and packaging artwork, and the marketing site. The app source code is MIT-licensed; everything else is reserved.', de: 'Dir gehören deine Gießdaten, Pflanzennamen und Fotos. Uns gehören der Name Aquatag, die Illustrationen, die Sticker- und Verpackungsgrafiken sowie die Marketingseite. Der App-Quellcode ist MIT-lizenziert; alles andere bleibt vorbehalten.' },
    'terms.s5.p2':      { en: 'You may post photos of your Aquatag stickers in the wild, remix them for personal use, and share your own automations. Please do not resell our artwork or manufacture counterfeit stickers.', de: 'Du darfst Fotos deiner Aquatag-Sticker posten, privat remixen und deine eigenen Automationen teilen. Bitte verkaufe unsere Grafiken nicht weiter und fertige keine Fälschungen an.' },
    'terms.s6.h':       { en: 'Warranty', de: 'Gewährleistung' },
    'terms.s6.p1':      { en: 'The app and stickers are provided "as is." We\u2019ve tested them on real plants in real apartments, but we can\u2019t warrant that your particular fig tree will survive — that is between you and the fig tree.', de: 'App und Sticker werden „wie besehen“ bereitgestellt. Wir haben sie an echten Pflanzen in echten Wohnungen getestet — ob dein spezieller Feigenbaum überlebt, können wir aber nicht garantieren. Das ist zwischen dir und dem Feigenbaum.' },
    'terms.s7.h':       { en: 'Liability', de: 'Haftung' },
    'terms.s7.p1':      { en: 'To the maximum extent permitted by law, our total liability for any claim is capped at the amount you paid us (€0 for the app; the kit price for the kit). We are not liable for indirect damages such as dead plants, missed reminders, or your partner\u2019s disappointment.', de: 'Soweit gesetzlich zulässig, ist unsere Gesamthaftung auf den von dir an uns gezahlten Betrag begrenzt (0 € für die App; der Kit-Preis für das Kit). Für mittelbare Schäden wie tote Pflanzen, verpasste Erinnerungen oder Enttäuschung deines Partners haften wir nicht.' },
    'terms.s8.h':       { en: 'Governing law', de: 'Anwendbares Recht' },
    'terms.s8.p1':      { en: 'These terms are governed by German law. Disputes go to the competent courts in Berlin, Germany. EU consumer protections apply if you are a consumer in the EU.', de: 'Es gilt deutsches Recht. Gerichtsstand ist Berlin. Verbraucherrechte in der EU bleiben unberührt.' },
    'terms.s8.p2':      { en: 'Questions, complaints, or ideas: <a href="mailto:hello@aquatag.app">hello@aquatag.app</a>.', de: 'Fragen, Beschwerden oder Ideen: <a href="mailto:hello@aquatag.app">hello@aquatag.app</a>.' },

    // ─────────── INDEX PAGE ───────────
    'index.eb':         { en: 'Aquatag · design round 01', de: 'Aquatag · Designrunde 01' },
    'index.h1.html':    { en: 'Two directions,<br>one <em>character.</em>', de: 'Zwei Richtungen,<br>ein <em>Charakter.</em>' },
    'index.intro':      {
      en: 'Marketing page + App Store screenshots + sticker artwork, in two palettes — playful cream "Nursery" and moody green "Terrarium" — both leaning into the hand-drawn plant characters on your stickers. Pick the one that fits, or mix pieces from each.',
      de: 'Marketingseite + App-Store-Screenshots + Sticker-Artwork, in zwei Paletten — verspielt-creme „Nursery“ und stimmungsvoll-grün „Terrarium“ — beide mit den handgezeichneten Pflanzencharakteren auf deinen Stickern. Wähl eine aus oder misch Elemente aus beiden.'
    },
    'index.section.direction.html': { en: 'Pick a <em>direction</em>', de: 'Wähl eine <em>Richtung</em>' },
    'index.card.nursery.num':   { en: 'V1 · Landing', de: 'V1 · Landingpage' },
    'index.card.nursery.h.html':{ en: '<em>Nursery</em><br>Cream, serif, editorial.', de: '<em>Nursery</em><br>Creme, Serif, editorial.' },
    'index.card.nursery.p':     { en: 'Warm cream paper, bold Fraunces headlines, stickers scattered as characters. Leans zine/lookbook — the playful direction.', de: 'Warmes Creme-Papier, kräftige Fraunces-Headlines, Sticker als Charaktere verstreut. Zine-/Lookbook-Feeling — die verspielte Richtung.' },
    'index.card.nursery.arrow': { en: 'Open landing page \u2192', de: 'Landingpage öffnen \u2192' },
    'index.card.terr.num':   { en: 'V2 · Landing', de: 'V2 · Landingpage' },
    'index.card.terr.h.html':{ en: 'Terrarium<br>Moss <em>green</em>, glowing.', de: 'Terrarium<br>Moos<em>grün</em>, leuchtend.' },
    'index.card.terr.p':     { en: 'Dark moss background with a glowing NFC tap hero moment. Feels like a terrarium at night — the premium direction.', de: 'Dunkler Moos-Hintergrund mit leuchtendem NFC-Tipp-Moment. Wirkt wie ein Terrarium bei Nacht — die Premium-Richtung.' },
    'index.card.terr.arrow': { en: 'Open landing page \u2192', de: 'Landingpage öffnen \u2192' },
    'index.section.screens.html': { en: 'App Store <em>screenshots</em>', de: 'App-Store-<em>Screenshots</em>' },
    'index.card.shots.num': { en: '5 shots × 2 palettes', de: '5 Motive × 2 Paletten' },
    'index.card.shots.h.html': { en: 'The full <em>set.</em>', de: 'Das volle <em>Set.</em>' },
    'index.card.shots.p':   { en: 'Dashboard · Tap moment · Plant detail · Add a plant · History — in both Nursery and Terrarium. Each shot has its own caption, kicker, and background treatment for visual variety across the App Store carousel.', de: 'Dashboard · Tipp-Moment · Pflanzendetail · Pflanze hinzufügen · Verlauf — in Nursery und Terrarium. Jedes Motiv mit eigener Caption, Kicker und Hintergrund für Abwechslung im App-Store-Karussell.' },
    'index.card.shots.arrow': { en: 'Open screenshot sheet \u2192', de: 'Screenshot-Bogen öffnen \u2192' },
    'index.card.art.num':   { en: 'Artwork · v2 locked', de: 'Artwork · v2 final' },
    'index.card.art.h.html':{ en: 'Stickers & <em>T-flags.</em>', de: 'Sticker & <em>T-Flaggen.</em>' },
    'index.card.art.p':     { en: 'Six characters, six stake colors — one permanent pairing each, with every character\u2019s palette retuned to match its flag hex. Paint-matched from your hardware photo.', de: 'Sechs Charaktere, sechs Stake-Farben — jeweils eine feste Paarung, jede Charakter-Palette exakt auf den Flaggen-Hex-Wert abgestimmt. Farblich abgeglichen mit deinem Hardware-Foto.' },
    'index.card.art.arrow': { en: 'Open artwork \u2192', de: 'Artwork öffnen \u2192' },
    'index.section.pack.html': { en: 'Gift <em>packaging</em>', de: 'Geschenk<em>verpackung</em>' },
    'index.card.pack.num': { en: 'Kit box · 2 variants', de: 'Kit-Box · 2 Varianten' },
    'index.card.pack.h.html': { en: 'The <em>boxed</em> six-pack.', de: 'Das <em>Sechserset</em> in der Box.' },
    'index.card.pack.p':   { en: 'Pre-assembled flag-and-sticker gift kit in two aesthetics — cream kraft (Nursery) and dark moss with gold foil (Terrarium). Outer box, open tray, dieline, and quickstart card.', de: 'Vormontiertes Flaggen-und-Sticker-Geschenkset in zwei Ästhetiken — Creme-Kraftpapier (Nursery) und dunkles Moos mit Goldfolie (Terrarium). Außenbox, offenes Tablett, Stanzkontur und Quickstart-Karte.' },
    'index.card.pack.arrow': { en: 'Open packaging \u2192', de: 'Verpackung öffnen \u2192' },
    'index.card.refill.num': { en: 'Optional add-on', de: 'Optionales Add-on' },
    'index.card.refill.h.html': { en: 'Refill sticker <em>sheet.</em>', de: 'Nachfüll-<em>Stickerbogen.</em>' },
    'index.card.refill.p':   { en: 'Bare 25mm rounds, no flags — for anyone who already owns stakes. Happy to mock this up next if you want it as its own SKU.', de: 'Nackte 25-mm-Runde, keine Flaggen — für alle, die schon Stakes haben. Gerne als eigene SKU entworfen, wenn gewünscht.' },
    'index.card.refill.arrow': { en: 'Say the word \u2192', de: 'Sag Bescheid \u2192' },
    'index.notes.title': { en: 'Design notes', de: 'Design-Notizen' },
    'index.notes.type.html':    { en: '<b>Type system.</b> Fraunces (serif, optical-sized) for display and moments that should feel warm. IBM Plex Sans for UI, IBM Plex Mono for labels and tag IDs. Italics everywhere as an accent.', de: '<b>Typo-System.</b> Fraunces (Serif, optisch skaliert) für Display und warme Momente. IBM Plex Sans für UI, IBM Plex Mono für Labels und Tag-IDs. Kursiv als Akzent.' },
    'index.notes.colors.html':  { en: '<b>Colors.</b> Palette lifts directly from your existing stickers — moss <code>#2d8c4e</code>, amber <code>#e8a020</code>, terracotta <code>#c8463a</code>, fern teal <code>#1a8080</code>, violet <code>#9b4dca</code>, dahlia red <code>#e05050</code> — plus a warm cream paper <code>#f6efdf</code> and a deep terrarium green <code>#0f2a1e</code>.', de: '<b>Farben.</b> Palette direkt von deinen bestehenden Stickern — Moos <code>#2d8c4e</code>, Bernstein <code>#e8a020</code>, Terrakotta <code>#c8463a</code>, Farn-Petrol <code>#1a8080</code>, Violett <code>#9b4dca</code>, Dahlienrot <code>#e05050</code> — plus warmes Creme-Papier <code>#f6efdf</code> und tiefes Terrariengrün <code>#0f2a1e</code>.' },
    'index.notes.chars.html':   { en: '<b>Characters.</b> Recreated as parametric React SVGs so they scale cleanly anywhere. Roster locked at six — one per flag color (green, blue, yellow, red, pink, white).', de: '<b>Charaktere.</b> Als parametrische React-SVGs neu gebaut, skalieren überall sauber. Ensemble auf sechs festgelegt — einer pro Flaggenfarbe (Grün, Blau, Gelb, Rot, Pink, Weiß).' },
    'index.notes.app.html':     { en: '<b>App mockups.</b> The screens are new interpretations of the real SwiftUI views. Currently using sticker characters as avatars (per your "emoji default, sticker when tagged" preference) — if you want pure emoji mocks we can flip the <code>useStickers</code> flag on <code>ScreenPlantList</code>.', de: '<b>App-Mockups.</b> Die Screens sind Neuinterpretationen der echten SwiftUI-Views. Aktuell mit Sticker-Charakteren als Avataren (entsprechend deiner Präferenz „Emoji als Default, Sticker bei getagten“) — für reine Emoji-Mockups kippen wir das <code>useStickers</code>-Flag auf <code>ScreenPlantList</code>.' },
    'index.notes.next.html':    { en: '<b>Next steps.</b> Pick a direction (or say "hybrid"); I\u2019ll tighten type scale + polish motion. Tell me if you want real photography on the stickers CTA instead of the existing flag photo.', de: '<b>Nächste Schritte.</b> Richtung wählen (oder „hybrid“ sagen); ich feinjustiere Typo-Skala und Motion. Sag Bescheid, falls du echte Fotografie statt des bestehenden Flaggen-Fotos im Sticker-CTA möchtest.' },

    // ─────────── NURSERY LANDING ───────────
    'nu.hero.kicker':      { en: 'A tiny ritual for your plants', de: 'Ein kleines Ritual für deine Pflanzen' },
    'nu.hero.h1.html':     { en: 'Tap the pot,<br>water the <em>plant</em>,<br>call it <span id="inline-sticker-slot"></span>done.', de: 'Topf antippen,<br><em>Pflanze</em> gießen,<br>ab<span id="inline-sticker-slot"></span>haken.' },
    'nu.hero.sub':         { en: 'Aquatag is an NFC-based plant tracker for iOS. Stick a tag on each pot, tap it when you water, and let your Home Assistant do the remembering.', de: 'Aquatag ist ein NFC-basierter Pflanzen-Tracker für iOS. Klebe einen Tag auf jeden Topf, tippe ihn beim Gießen an — Home Assistant merkt sich den Rest.' },
    'nu.steps.eyebrow':    { en: 'Three steps, one tap', de: 'Drei Schritte, ein Tipp' },
    'nu.steps.h.html':     { en: 'No app-fumbling.<br>No spreadsheet.<br>Just a tap.', de: 'Kein App-Gefummel.<br>Keine Tabelle.<br>Nur ein Tipp.' },
    'nu.steps.p':          { en: 'An NTAG sticker on the pot, a tap with your phone, and your watering log lives in Home Assistant forever.', de: 'Ein NTAG-Sticker am Topf, ein Tipp mit dem Handy — und dein Gieß-Logbuch lebt für immer in Home Assistant.' },
    'nu.step1.h.html':     { en: 'Stick a tag<br>on the pot.', de: 'Tag auf den<br>Topf kleben.' },
    'nu.step1.p':          { en: 'Any NTAG213 sticker works — we recommend our illustrated ones, but a plain round one is perfect too.', de: 'Jeder NTAG213-Sticker geht — wir empfehlen unsere illustrierten, ein schlichter runder passt aber genauso.' },
    'nu.step2.h.html':     { en: 'Tap when you<br>water it.', de: 'Beim Gießen<br>antippen.' },
    'nu.step2.p':          { en: 'iOS NFC fires instantly from the lock screen. No app to open. The whole thing takes under a second.', de: 'iOS-NFC löst sofort vom Sperrbildschirm aus. Keine App zu öffnen. Unter einer Sekunde erledigt.' },
    'nu.step3.h.html':     { en: 'Home Assistant<br>remembers.', de: 'Home Assistant<br>merkt sich alles.' },
    'nu.step3.p.html':     { en: 'A single REST call bumps the <code>input_datetime</code> helper and fires an <code>aquatag_plant_watered</code> event.', de: 'Ein einziger REST-Call aktualisiert den <code>input_datetime</code>-Helper und feuert ein <code>aquatag_plant_watered</code>-Event.' },
    'nu.cast.h.html':      { en: 'Every plant gets<br>a <em>name</em>.', de: 'Jede Pflanze bekommt<br>einen <em>Namen</em>.' },
    'nu.cast.p':           { en: 'Stickers aren\u2019t just identifiers. Each one is a little character so the kids remember whose turn it is to water.', de: 'Sticker sind nicht nur Kennzeichen. Jeder ist ein kleiner Charakter — damit auch die Kinder wissen, wer als Nächstes Wasser bekommt.' },
    'nu.screens.h.html':   { en: 'A dashboard<br>that <em>breathes</em>.', de: 'Ein Dashboard,<br>das <em>atmet</em>.' },
    'nu.screens.p':        { en: 'Big serif, lots of air, no dashboards disguised as spreadsheets. Only what you need to know today.', de: 'Große Serif, viel Luft, keine als Tabellen verkleideten Dashboards. Nur, was du heute wissen musst.' },
    'nu.cta.h.html':       { en: 'Order a<br><em>set of six.</em>', de: 'Ein <em>Sechser-<br>Set</em> bestellen.' },
    'nu.cta.p':            { en: '25mm waterproof NTAG213 stickers, illustrated by hand, pre-programmed, ready to stick.', de: '25 mm wasserfeste NTAG213-Sticker, von Hand illustriert, vorprogrammiert, einfach aufkleben.' },
    'nu.cta.btn':          { en: 'Order stickers — $18', de: 'Sticker bestellen — 18 $' },
    'nu.cta.ghost':        { en: 'or print your own \u2192', de: 'oder selbst drucken \u2192' },
    'nu.val1.num':         { en: '01 / Zero lock-in', de: '01 / Kein Lock-in' },
    'nu.val1.h':           { en: 'Works without Home Assistant.', de: 'Funktioniert ohne Home Assistant.' },
    'nu.val1.p':           { en: 'HA sync is optional. The app is fully useful on its own — reminders, history, notifications, all offline.', de: 'HA-Sync ist optional. Die App funktioniert komplett allein — Erinnerungen, Verlauf, Benachrichtigungen, alles offline.' },
    'nu.val2.num':         { en: '02 / Zero dependencies', de: '02 / Keine Abhängigkeiten' },
    'nu.val2.h':           { en: 'Swift 6, nothing else.', de: 'Swift 6, sonst nichts.' },
    'nu.val2.p':           { en: 'No analytics, no tracking SDKs, no backend you don\u2019t own. Your watering history never leaves your devices.', de: 'Keine Analytik, keine Tracking-SDKs, kein fremdes Backend. Dein Gieß-Verlauf verlässt nie deine Geräte.' },
    'nu.val3.num':         { en: '03 / Zero accounts', de: '03 / Keine Konten' },
    'nu.val3.h':           { en: 'No sign-up. Ever.', de: 'Nie wieder anmelden.' },
    'nu.val3.p':           { en: 'Open the app, add a plant, stick a tag. That\u2019s the whole onboarding. Forever free.', de: 'App öffnen, Pflanze hinzufügen, Tag aufkleben. Das ist das ganze Onboarding. Für immer kostenlos.' },
    'nu.faq.h':            { en: 'Questions, answered.', de: 'Fragen, beantwortet.' },
    'nu.faq.q1':           { en: 'Do I need Home Assistant?', de: 'Brauche ich Home Assistant?' },
    'nu.faq.a1':           { en: 'No. The app works fully on its own. HA sync is a free upgrade if you already run Nabu Casa.', de: 'Nein. Die App funktioniert eigenständig. HA-Sync ist ein kostenloses Upgrade, wenn du schon Nabu Casa nutzt.' },
    'nu.faq.q2':           { en: 'Which NFC stickers work?', de: 'Welche NFC-Sticker funktionieren?' },
    'nu.faq.a2':           { en: 'Any NTAG213 or newer. Our illustrated ones are pre-programmed, but any blank tag can be written from inside the app.', de: 'Alle NTAG213 oder neuer. Unsere illustrierten sind vorprogrammiert, jeder leere Tag lässt sich aber in der App beschreiben.' },
    'nu.faq.q3':           { en: 'Can multiple people log waterings?', de: 'Können mehrere Personen Gießen protokollieren?' },
    'nu.faq.a3':           { en: 'Yes. Each iPhone identifies itself by device name so you can see who watered what.', de: 'Ja. Jedes iPhone identifiziert sich per Gerätename — du siehst, wer was gegossen hat.' },
    'nu.faq.q4':           { en: 'What about iPhones without NFC?', de: 'Was ist mit iPhones ohne NFC?' },
    'nu.faq.a4':           { en: 'iPhone 7 and newer have it. You can also tap a water button manually — the NFC tag is just the fast path.', de: 'iPhone 7 und neuer haben NFC. Alternativ kannst du den Gieß-Button manuell tippen — der NFC-Tag ist nur der schnelle Weg.' },
    'nu.faq.q5':           { en: 'Is it open source?', de: 'Ist es Open Source?' },
    'nu.faq.a5':           { en: 'The app source is on GitHub. The stickers and illustrations are not.', de: 'Der App-Quellcode ist auf GitHub. Sticker und Illustrationen nicht.' },
    'nu.footer.h.html':    { en: '<em>Water things.</em><br>Forget the spreadsheet.', de: '<em>Gieß Dinge.</em><br>Vergiss die Tabelle.' },

    // ─────────── TERRARIUM LANDING ───────────
    'tr.hero.kicker':      { en: 'The plant ritual, reinvented', de: 'Das Pflanzen-Ritual, neu gedacht' },
    'tr.hero.h1.html':     { en: 'Your pots<br>know when<br>they\u2019re <em>thirsty.</em>', de: 'Deine Töpfe<br>wissen, wann<br>sie <em>durstig</em> sind.' },
    'tr.hero.p':           { en: 'Tap an NFC sticker on the pot to log watering. Aquatag syncs to Home Assistant, schedules reminders, and remembers everything — offline-first, no account.', de: 'Tippe einen NFC-Sticker am Topf an, um das Gießen zu loggen. Aquatag synct mit Home Assistant, plant Erinnerungen und merkt sich alles — offline-first, ohne Konto.' },
    'tr.stat1.b':          { en: '0.4s', de: '0,4 s' },
    'tr.stat1.t':          { en: 'NFC tap to logged, from the lock screen.', de: 'Vom NFC-Tipp bis geloggt — direkt vom Sperrbildschirm.' },
    'tr.stat2.b':          { en: '\u221E', de: '\u221E' },
    'tr.stat2.t':          { en: 'waterings stored, no account required.', de: 'gespeicherte Gieß-Vorgänge, ohne Konto.' },
    'tr.stat3.b':          { en: '$0', de: '0 €' },
    'tr.stat3.t':          { en: 'forever. Open source. Hardware optional.', de: 'für immer. Open Source. Hardware optional.' },
    'tr.stat4.b':          { en: '6', de: '6' },
    'tr.stat4.t':          { en: 'characters in the roster — pick your favourite.', de: 'Charaktere im Ensemble — wähl deinen Liebling.' },
    'tr.cast.h.html':      { en: 'The <em>roster.</em>', de: 'Das <em>Ensemble.</em>' },
    'tr.cast.sub':         { en: 'Six hand-drawn characters, each on a waterproof NTAG213 sticker. They live on the pot, forever, even when you\u2019re travelling.', de: 'Sechs handgezeichnete Charaktere, jeder auf einem wasserfesten NTAG213-Sticker. Sie bleiben am Topf — auch wenn du verreist bist.' },
    'tr.how.h.html':       { en: 'One tap. <em>That\u2019s it.</em><br>Everything else is handled.', de: 'Ein Tipp. <em>Das war\u2019s.</em><br>Der Rest läuft von selbst.' },
    'tr.how1.h':           { en: 'NFC fires from the lock screen.', de: 'NFC löst vom Sperrbildschirm aus.' },
    'tr.how1.p.html':      { en: 'Aquatag registers <code>aquatag:*</code> URLs with iOS, so the tag opens directly into the app — even from a locked phone.', de: 'Aquatag registriert <code>aquatag:*</code>-URLs bei iOS, sodass der Tag direkt die App öffnet — auch beim gesperrten Handy.' },
    'tr.how2.h':           { en: 'SwiftData logs locally first.', de: 'SwiftData loggt zuerst lokal.' },
    'tr.how2.p':           { en: 'The watering event saves to the device before anything hits the network. You\u2019re never waiting on a spinner.', de: 'Das Gieß-Event wird erst lokal gespeichert, bevor überhaupt etwas ins Netz geht. Kein Warten auf Lade-Spinner.' },
    'tr.how3.h':           { en: 'Home Assistant syncs in the background.', de: 'Home Assistant synct im Hintergrund.' },
    'tr.how3.p.html':      { en: 'A <code>POST /api/services/input_datetime/set_datetime</code> bumps your helper, a <code>aquatag_plant_watered</code> event fires for your automations.', de: 'Ein <code>POST /api/services/input_datetime/set_datetime</code> aktualisiert deinen Helper, ein <code>aquatag_plant_watered</code>-Event feuert für deine Automationen.' },
    'tr.how4.h':           { en: 'Reminders schedule themselves.', de: 'Erinnerungen planen sich selbst.' },
    'tr.how4.p':           { en: 'Local notifications fire based on each plant\u2019s interval. Overdue plants glow red on the dashboard. Happy ones stay quiet.', de: 'Lokale Benachrichtigungen basieren auf dem Intervall jeder Pflanze. Überfällige leuchten rot im Dashboard, glückliche bleiben ruhig.' },
    'tr.screens.eyebrow':  { en: 'The app, five ways', de: 'Die App, fünf Ansichten' },
    'tr.screens.h.html':   { en: 'Quiet, <em>generous</em>, green.', de: 'Ruhig, <em>großzügig</em>, grün.' },
    'tr.cta.h.html':       { en: 'The <em>physical</em><br>part.', de: 'Der <em>physische</em><br>Teil.' },
    'tr.cta.p':            { en: '25mm waterproof NTAG213 stickers, pre-programmed, illustrated by hand. Or T-shaped flag labels that sit above the soil — perfect for transparent pots where a face on the side would be upside-down.', de: '25 mm wasserfeste NTAG213-Sticker, vorprogrammiert, handillustriert. Oder T-förmige Flaggenlabel über der Erde — perfekt für transparente Töpfe, wo ein Gesicht an der Seite auf dem Kopf stünde.' },
    'tr.cta.l1':           { en: 'NTAG213 — 144 bytes, plenty for an aquatag URL', de: 'NTAG213 — 144 Byte, reichlich für eine aquatag-URL' },
    'tr.cta.l2':           { en: 'Laminated — dishwasher-safe, sun-safe, mist-safe', de: 'Laminiert — spülmaschinen-, sonnen- und nebelfest' },
    'tr.cta.l3':           { en: 'Pre-programmed with the correct plant ID', de: 'Mit der richtigen Pflanzen-ID vorprogrammiert' },
    'tr.cta.l4':           { en: 'Six characters, one per flag color, $18/set', de: 'Sechs Charaktere, einer pro Flaggenfarbe, 18 $/Set' },
    'tr.cta.btn':          { en: 'Order a set \u2192', de: 'Set bestellen \u2192' },
    'tr.spec.ios':         { en: 'iOS', de: 'iOS' },
    'tr.spec.ios.v':       { en: '17.0+', de: '17.0+' },
    'tr.spec.lang':        { en: 'Written in', de: 'Geschrieben in' },
    'tr.spec.lang.v':      { en: 'Swift 6', de: 'Swift 6' },
    'tr.spec.bid':         { en: 'Bundle ID', de: 'Bundle-ID' },
    'tr.spec.deps':        { en: 'Dependencies', de: 'Abhängigkeiten' },
    'tr.spec.deps.v':      { en: 'Zero', de: 'Keine' },
    'tr.footer.h.html':    { en: 'Water things.<br><em>That\u2019s the point.</em>', de: 'Gieß Dinge.<br><em>Darum geht\u2019s.</em>' },
    'tr.footer.row1':      { en: 'Aquatag · Copyright © 2026 Andrei Kolmogorov', de: 'Aquatag · Copyright © 2026 Andrei Kolmogorov' },
    'tr.footer.row2':      { en: 'Built in Swift 6 · No dependencies · No accounts', de: 'Gebaut in Swift 6 · Keine Abhängigkeiten · Keine Konten' },

    // ─────────── APPSTORE SCREENSHOTS ───────────
    'as.title':            { en: 'App Store screenshots', de: 'App-Store-Screenshots' },
    'as.sub':              { en: 'iPhone 15 Pro · 1290 × 2796 (preview @ 30%)', de: 'iPhone 15 Pro · 1290 × 2796 (Vorschau 30 %)' },
    'as.var1.html':        { en: 'Variation 1 · <em>Nursery</em>', de: 'Variante 1 · <em>Nursery</em>' },
    'as.var2.html':        { en: 'Variation 2 · <em style="color:#6fd69a">Terrarium</em>', de: 'Variante 2 · <em style="color:#6fd69a">Terrarium</em>' },
    'as.shot1.k':          { en: 'The dashboard', de: 'Das Dashboard' },
    'as.shot1.h':          { en: 'Every plant, one glance.', de: 'Jede Pflanze auf einen Blick.' },
    'as.shot1.h.em':       { en: 'glance', de: 'Blick' },
    'as.shot2.k':          { en: 'The tap moment', de: 'Der Tipp-Moment' },
    'as.shot2.h':          { en: 'Tap the pot. Done.', de: 'Topf antippen. Fertig.' },
    'as.shot2.h.em':       { en: 'Done', de: 'Fertig' },
    'as.shot3.k':          { en: 'Plant detail', de: 'Pflanzendetail' },
    'as.shot3.h':          { en: 'A page for every friend.', de: 'Eine Seite für jeden Freund.' },
    'as.shot3.h.em':       { en: 'friend', de: 'Freund' },
    'as.shot4.k':          { en: 'Add a plant', de: 'Pflanze hinzufügen' },
    'as.shot4.h':          { en: 'Pick a face. Pick a cadence.', de: 'Gesicht wählen. Rhythmus wählen.' },
    'as.shot4.h.em':       { en: 'cadence', de: 'Rhythmus' },
    'as.shot5.k':          { en: 'History', de: 'Verlauf' },
    'as.shot5.h':          { en: 'Six weeks of growing up.', de: 'Sechs Wochen Wachstum.' },
    'as.shot5.h.em':       { en: 'growing up', de: 'Wachstum' },

    // ─────────── STICKERS & FLAGS ───────────
    'sf.eb':               { en: 'Round 02 · locked pairings', de: 'Runde 02 · fixierte Paarungen' },
    'sf.h1.html':          { en: 'One character<br>per <em>flag color.</em>', de: 'Ein Charakter<br>pro <em>Flaggenfarbe.</em>' },
    'sf.intro':            { en: 'Six characters, six flags, one permanent pairing each — so kits can be pre-assembled and the physical product reads as a matching set. Character palettes are retuned to the exact flag hex values painted from your reference photo.', de: 'Sechs Charaktere, sechs Flaggen, je eine feste Paarung — damit Kits vormontiert werden können und das Produkt als stimmiges Set wirkt. Charakter-Paletten sind auf die exakten Flaggen-Hex-Werte aus deinem Referenzfoto abgestimmt.' },
    'sf.ref.kicker':       { en: 'Reference', de: 'Referenz' },
    'sf.ref.h':            { en: 'Your hardware', de: 'Deine Hardware' },
    'sf.ref.p.html':       { en: 'Six T-flag stakes in <b>green, blue, yellow, red, pink, white</b>. I paint-matched the values directly from this photo — the swatches below are the canonical Aquatag flag palette.', de: 'Sechs T-Flag-Stakes in <b>Grün, Blau, Gelb, Rot, Pink, Weiß</b>. Farbwerte direkt vom Foto abgeglichen — die Swatches unten sind die kanonische Aquatag-Flaggenpalette.' },
    'sf.pal.kicker':       { en: 'Palette', de: 'Palette' },
    'sf.pal.h.html':       { en: 'The <em>flag</em> palette', de: 'Die <em>Flaggen</em>-Palette' },
    'sf.pal.p':            { en: 'Used on both the physical stakes and every character\u2019s sticker ring. These six hex values are the single source of truth.', de: 'Sowohl auf den physischen Stakes als auch auf dem Stickerring jedes Charakters. Diese sechs Hex-Werte sind die alleinige Wahrheit.' },
    'sf.pair.kicker':      { en: 'Pairings', de: 'Paarungen' },
    'sf.pair.h.html':      { en: 'The <em>six</em> characters', de: 'Die <em>sechs</em> Charaktere' },
    'sf.pair.p.html':      { en: 'Each character\u2019s primary color has been retuned to match its stake. Tagline: the flag <em>is</em> the character\u2019s color. Kit box holds them in this exact order.', de: 'Die Primärfarbe jedes Charakters ist auf seinen Stake abgestimmt. Tagline: Die Flagge <em>ist</em> die Farbe des Charakters. Die Kit-Box ordnet sie genau so.' },
    'sf.hero.kicker':      { en: 'Product shot', de: 'Produktfoto' },
    'sf.hero.h':           { en: 'The full set', de: 'Das komplette Set' },
    'sf.only.kicker':      { en: 'Stickers only', de: 'Nur Sticker' },
    'sf.only.h':           { en: 'Loose 25mm rounds', de: 'Lose 25-mm-Rundstücke' },
    'sf.only.p':           { en: 'Sold as a refill sheet. Same artwork, no stake — tap straight onto the pot.', de: 'Als Nachfüllbogen verkauft. Gleiche Illustration, ohne Stake — direkt auf den Topf kleben.' },

    // ─────────── PACKAGING ───────────
    'pk.eb':               { en: 'Round 02 · Packaging', de: 'Runde 02 · Verpackung' },
    'pk.h1.html':          { en: 'The <em>gift</em> kit, boxed.', de: 'Das <em>Geschenk</em>-Kit, verpackt.' },
    'pk.intro':            { en: 'Six pre-assembled flags + a quickstart setup card with QR — one SKU, gift-worthy, under a pound in weight. Two aesthetic directions for the outer: cream kraft to match the Nursery landing, dark matte with gold foil to match the Terrarium landing.', de: 'Sechs vormontierte Flaggen + eine Quickstart-Karte mit QR — eine SKU, geschenkreif, unter 500 g. Zwei Ästhetiken für außen: Creme-Kraftpapier passend zur Nursery-Landingpage, dunkel-matt mit Goldfolie passend zur Terrarium-Landingpage.' },
    'pk.spec.format':      { en: 'Format', de: 'Format' },
    'pk.spec.format.v':    { en: 'Shallow tray + lid', de: 'Flaches Tablett + Deckel' },
    'pk.spec.outer':       { en: 'Outer box', de: 'Außenbox' },
    'pk.spec.outer.v':     { en: '220 × 150 × 35 mm', de: '220 × 150 × 35 mm' },
    'pk.spec.weight':      { en: 'Weight', de: 'Gewicht' },
    'pk.spec.weight.v':    { en: '~180 g', de: '~180 g' },
    'pk.spec.sku':         { en: 'SKU', de: 'SKU' },
    'pk.spec.sku.v':       { en: 'AQT-KIT-06', de: 'AQT-KIT-06' },
    'pk.v1.kicker':        { en: 'Kit v1 · Nursery', de: 'Kit v1 · Nursery' },
    'pk.v1.h.html':        { en: 'The <em>cream kraft</em> version.', de: 'Die <em>Creme-Kraft</em>-Version.' },
    'pk.v1.p':             { en: 'Uncoated recycled kraft, 2-color screenprint (ink + sage green). Letterpress impression on the title. Feels like a seed packet — tactile, warm, gift-shop-ready.', de: 'Unbeschichtetes Recycling-Kraftpapier, 2-Farben-Siebdruck (Tinte + Salbeigrün). Letterpress-Prägung auf dem Titel. Wirkt wie eine Samentüte — haptisch, warm, geschenkbereit.' },
    'pk.box.tl':           { en: 'Aquatag · Starter Kit', de: 'Aquatag · Starter-Kit' },
    'pk.box.title.html':   { en: 'Six little<br><em>friends.</em>', de: 'Sechs kleine<br><em>Freunde.</em>' },
    'pk.box.sub.html':     { en: 'NFC plant tags, pre-paired,<br>ready to stake.', de: 'NFC-Pflanzen-Tags, vorgepaart,<br>bereit zum Stecken.' },
    'pk.box.feet.a':       { en: 'Pre-programmed · NTAG213', de: 'Vorprogrammiert · NTAG213' },
    'pk.box.feet.b':       { en: 'iOS · Home Assistant', de: 'iOS · Home Assistant' },
    'pk.box.feet.a2':      { en: 'NTAG213 · aquatag.app', de: 'NTAG213 · aquatag.app' },
    'pk.box.feet.b2':      { en: 'MADE IN 2026', de: 'HERGESTELLT 2026' },
    'pk.insert.kicker':    { en: 'Setup in 3 steps', de: 'Einrichtung in 3 Schritten' },
    'pk.insert.h.html':    { en: 'Welcome to your <em>watering</em> schedule.', de: 'Willkommen in deinem <em>Gieß</em>-Plan.' },
    'pk.insert.s1.html':   { en: 'Install <b>Aquatag</b> from the App Store', de: '<b>Aquatag</b> aus dem App Store laden' },
    'pk.insert.s2.html':   { en: 'Open Settings \u2192 paste your Nabu Casa URL + long-lived token', de: 'Einstellungen \u2192 Nabu-Casa-URL + Long-Lived-Token einfügen' },
    'pk.insert.s3':        { en: 'Stake a flag, tap your phone to the sticker, name the plant', de: 'Flagge stecken, Handy an den Sticker halten, Pflanze benennen' },
    'pk.insert.qr.html':   { en: 'Scan to install<br>& view HA setup', de: 'Scannen zum Installieren<br>& HA-Setup ansehen' },
    'pk.cap.outer':        { en: 'Outer lid · closed', de: 'Deckel · geschlossen' },
    'pk.cap.outer.foil':   { en: 'Outer lid · closed (gold foil)', de: 'Deckel · geschlossen (Goldfolie)' },
    'pk.cap.quick':        { en: 'Quickstart card · 120×160mm insert', de: 'Quickstart-Karte · Einleger 120×160 mm' },
    'pk.cap.quick.dark':   { en: 'Quickstart card · cream ink on moss stock', de: 'Quickstart-Karte · Creme-Tinte auf Moos-Karton' },
    'pk.cap.tray':         { en: 'Tray, open · flags in hardware order', de: 'Tablett offen · Flaggen in Hardware-Reihenfolge' },
    'pk.cap.tray.foil':    { en: 'Tray, open · satin moss foam bed', de: 'Tablett offen · Satin-Moos-Schaumbett' },
    'pk.cap.dieline':      { en: 'Dieline · kraft lid, single-piece, 4 folds + glue tab', de: 'Stanzkontur · Kraft-Deckel, einteilig, 4 Falze + Klebelasche' },
    'pk.cap.dieline.foil': { en: 'Dieline · same structure, moss stock + foil', de: 'Stanzkontur · gleiche Struktur, Moos-Karton + Folie' },
    'pk.v2.kicker':        { en: 'Kit v2 · Terrarium', de: 'Kit v2 · Terrarium' },
    'pk.v2.h.html':        { en: 'The <em>dark + foil</em> version.', de: 'Die <em>Dunkel + Folie</em>-Version.' },
    'pk.v2.p':             { en: 'Matte black-green coated stock, hot-foil gold title, debossed serif wordmark. Heavier, more giftable, reads premium on a shelf next to plant-shop ceramics.', de: 'Matt-schwarzgrüner Beschichtungskarton, Heißfolien-Goldtitel, geprägte Serif-Wortmarke. Schwerer, geschenktauglicher, wirkt premium neben Pflanzenladen-Keramik.' },
    'pk.contents.kicker':  { en: 'Kit contents', de: 'Kit-Inhalt' },
    'pk.contents.h.html':  { en: 'What\u2019s <em>inside</em> the box.', de: 'Was <em>drin</em> ist.' },
    'pk.item1.num':        { en: '01 · Hardware', de: '01 · Hardware' },
    'pk.item1.h':          { en: 'Six pre-assembled flags', de: 'Sechs vormontierte Flaggen' },
    'pk.item1.p.html':     { en: 'One per color, NTAG213 sticker already applied and pre-programmed to <code>aquatag:{plant}</code>. Laid flat in a foam tray so the stakes don\u2019t rattle.', de: 'Eine pro Farbe, NTAG213-Sticker bereits aufgebracht und auf <code>aquatag:{plant}</code> vorprogrammiert. Flach im Schaumstoff-Tablett, damit nichts klappert.' },
    'pk.item2.num':        { en: '02 · Paper', de: '02 · Papier' },
    'pk.item2.h':          { en: 'Quickstart card', de: 'Quickstart-Karte' },
    'pk.item2.p':          { en: '120×160 mm folded card. Front: setup in 3 steps + QR. Inside: the six characters with their plant names, so you know who\u2019s who before you stake them.', de: '120×160 mm Faltkarte. Vorn: 3 Schritte + QR. Innen: die sechs Charaktere mit Pflanzennamen, damit du weißt, wer wer ist, bevor du sie steckst.' },
    'pk.item3.num':        { en: '03 · Advanced', de: '03 · Advanced' },
    'pk.item3.h':          { en: 'Home Assistant cheatsheet', de: 'Home-Assistant-Cheatsheet' },
    'pk.item3.p.html':     { en: 'A5 single-sheet, folded. YAML automation examples, entity naming, the <code>aquatag_plant_watered</code> event schema, and a sample Lovelace card.', de: 'A5-Einzelblatt, gefaltet. YAML-Automations-Beispiele, Entity-Naming, das <code>aquatag_plant_watered</code>-Event-Schema und eine Lovelace-Beispielkarte.' },

    // ─────────── APP SCREENS (i18n consumed in JSX via window.t) ───────────
    'app.today':           { en: 'Today · {n} need water', de: 'Heute · {n} brauchen Wasser' },
    'app.your_plants':     { en: 'Your plants', de: 'Deine Pflanzen' },
    'app.overdue_d':       { en: '{n}d overdue', de: '{n} T überfällig' },
    'app.water_today':     { en: 'Water today', de: 'Heute gießen' },
    'app.water_tomorrow':  { en: 'Water tomorrow', de: 'Morgen gießen' },
    'app.in_d':            { en: 'In {n}d', de: 'In {n} T' },
    'app.scan_tag':        { en: 'Scan a tag', de: 'Tag scannen' },
    'app.nfc_watered':     { en: 'NFC · Watered now', de: 'NFC · Jetzt gegossen' },
    'app.hydrated':        { en: '{name}, hydrated.', de: '{name}, gegossen.' },
    'app.next_in':         { en: 'Next drink in {n} days. Logged to Home Assistant.', de: 'Nächster Schluck in {n} Tagen. In Home Assistant geloggt.' },
    'app.edit':            { en: 'Edit', de: 'Bearbeiten' },
    'app.next_watering':   { en: 'Next watering', de: 'Nächstes Gießen' },
    'app.last_tapped':     { en: 'Last tapped 3 days ago · by iPhone 15', de: 'Zuletzt getippt vor 3 Tagen · von iPhone 15' },
    'app.row.interval':    { en: 'Watering interval', de: 'Gieß-Intervall' },
    'app.row.interval.v':  { en: '7 days', de: '7 Tage' },
    'app.row.tag':         { en: 'NFC tag', de: 'NFC-Tag' },
    'app.row.ha':          { en: 'Home Assistant', de: 'Home Assistant' },
    'app.row.ha.v':        { en: 'Synced 2m ago', de: 'Vor 2 Min. synchronisiert' },
    'app.row.notif':       { en: 'Notifications', de: 'Benachrichtigungen' },
    'app.row.notif.v':     { en: 'On · at 9am', de: 'An · um 9 Uhr' },
    'app.write_tag':       { en: 'Write to a new NFC tag', de: 'Auf neuen NFC-Tag schreiben' },
    'app.cancel':          { en: 'Cancel', de: 'Abbrechen' },
    'app.save':            { en: 'Save', de: 'Speichern' },
    'app.meet_new.html':   { en: 'Meet your new<br>plant friend.', de: 'Dein neuer<br>Pflanzenfreund.' },
    'app.pick_character':  { en: 'Pick a character', de: 'Charakter wählen' },
    'app.field.name':      { en: 'Name', de: 'Name' },
    'app.field.species':   { en: 'Species', de: 'Art' },
    'app.field.species.v': { en: 'Pilea peperomioides', de: 'Pilea peperomioides' },
    'app.field.water':     { en: 'Water every', de: 'Gießen alle' },
    'app.field.water.v':   { en: '4 days', de: '4 Tage' },
    'app.days_between':    { en: 'days between waters', de: 'Tage zwischen Gießen' },
    'app.last_six':        { en: 'The last six weeks', de: 'Die letzten sechs Wochen' },
    'app.history':         { en: 'History', de: 'Verlauf' },
    'app.waterings':       { en: 'waterings', de: 'Gießen' },
    'app.day_streak':      { en: 'day streak', de: 'Tage Serie' },
    'app.this_week':       { en: 'This week', de: 'Diese Woche' },
    'app.watered_by':      { en: 'Watered {when} · by {who}', de: 'Gegossen {when} · von {who}' },
    'app.when.2h':         { en: '2h ago', de: 'vor 2 Std.' },
    'app.when.yesterday':  { en: 'Yesterday', de: 'Gestern' },
    'app.when.monday':     { en: 'Monday', de: 'Montag' },
    'app.day.mon':         { en: 'Mon', de: 'Mo' },
    'app.day.tue':         { en: 'Tue', de: 'Di' },
    'app.day.wed':         { en: 'Wed', de: 'Mi' },
    'app.day.thu':         { en: 'Thu', de: 'Do' },
    'app.day.fri':         { en: 'Fri', de: 'Fr' },
    'app.day.sat':         { en: 'Sat', de: 'Sa' },
    'app.day.sun':         { en: 'Sun', de: 'So' },
  };

  const LS_KEY = 'aquatag.lang';
  let LANG = 'en';
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved === 'de' || saved === 'en') LANG = saved;
  } catch (e) {}

  const listeners = new Set();

  function t(key, vars) {
    const row = DICT[key];
    if (!row) return key;
    let s = (row[LANG] != null ? row[LANG] : row.en) || '';
    if (vars) {
      for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
    }
    return s;
  }

  function applyTranslations(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    root.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(key);
    });
    // Title tag
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) document.title = t(titleEl.getAttribute('data-i18n'));
    // <html lang>
    document.documentElement.lang = LANG;
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'de') return;
    if (lang === LANG) return;
    LANG = lang;
    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
    applyTranslations();
    const btns = document.querySelectorAll('.aq-lang-btn');
    btns.forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
    listeners.forEach(cb => { try { cb(lang); } catch (e) {} });
  }

  function onLangChange(cb) { listeners.add(cb); return () => listeners.delete(cb); }

  function injectToggle() {
    if (document.getElementById('aq-lang-toggle')) return;
    const css = document.createElement('style');
    css.textContent = `
      .aq-lang-toggle{display:inline-flex;gap:2px;
        font-family:'IBM Plex Mono',ui-monospace,monospace;
        font-size:11px;font-weight:500;letter-spacing:1.5px;
        opacity:0.7;}
      .aq-lang-toggle:hover{opacity:1}
      .aq-lang-btn{appearance:none;border:0;cursor:pointer;
        padding:4px 8px;background:transparent;
        color:inherit;font:inherit;letter-spacing:inherit;
        border-radius:4px;
        transition:background 0.15s,color 0.15s;}
      .aq-lang-btn.is-active{text-decoration:underline;text-underline-offset:4px;font-weight:700;}
      .aq-lang-sep{opacity:0.35;padding:4px 0;user-select:none}
    `;
    document.head.appendChild(css);

    function buildToggle() {
      const wrap = document.createElement('span');
      wrap.className = 'aq-lang-toggle';
      wrap.setAttribute('role', 'group');
      wrap.setAttribute('aria-label', 'Language');
      const langs = ['en','de'];
      langs.forEach((lc, i) => {
        const b = document.createElement('button');
        b.className = 'aq-lang-btn' + (LANG === lc ? ' is-active' : '');
        b.dataset.lang = lc;
        b.textContent = lc.toUpperCase();
        b.onclick = () => setLang(lc);
        wrap.appendChild(b);
        if (i < langs.length - 1) {
          const sep = document.createElement('span');
          sep.className = 'aq-lang-sep';
          sep.textContent = '·';
          wrap.appendChild(sep);
        }
      });
      return wrap;
    }

    // Prefer a footer slot — <*[data-lang-slot]> — if present.
    const slot = document.querySelector('[data-lang-slot]');
    const el = buildToggle();
    el.id = 'aq-lang-toggle';
    if (slot) {
      slot.appendChild(el);
    } else {
      // Fallback: unobtrusive pill anchored to the footer area, not fixed.
      const css2 = document.createElement('style');
      css2.textContent = `#aq-lang-toggle.aq-lang-fallback{position:fixed;bottom:18px;right:18px;z-index:9999;padding:6px 10px;border-radius:999px;background:rgba(27,42,26,0.85);color:#f6efdf;backdrop-filter:blur(10px);opacity:0.55}#aq-lang-toggle.aq-lang-fallback:hover{opacity:1}`;
      document.head.appendChild(css2);
      el.classList.add('aq-lang-fallback');
      document.body.appendChild(el);
    }
  }

  function init() {
    applyTranslations();
    injectToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.t = t;
  window.setLang = setLang;
  window.getLang = () => LANG;
  window.onLangChange = onLangChange;
  window.applyTranslations = applyTranslations;
})();
