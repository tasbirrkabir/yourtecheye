/**
 * Blog seed: five field notes grounded in the YTE founder's public LinkedIn
 * themes (white-label monitoring, active threat detection, the human element)
 * plus YTE's verified service lines. Idempotent: safe to run repeatedly.
 *
 * Run: bun scripts/seed-blog.mjs
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const LINKEDIN = "https://www.linkedin.com/in/md-al-amin-bba7901a4/";

const posts = [
  {
    slug: "why-us-security-agencies-cut-monitoring-costs-50-percent-white-label",
    title: "Why US security agencies are cutting monitoring costs in half with white-label surveillance",
    excerpt:
      "Running an in-house monitoring room is the most expensive line in a security budget. White-label monitoring turns that fixed cost into a service you resell under your own brand.",
    coverImage: "/media/monitoring-operator-wall.webp",
    tags: "white-label, remote guarding, SOC, security integrators",
    author: "Md Al-Amin",
    readMinutes: 5,
    publishedAt: "2026-10-20T04:00:00.000Z",
    sourceUrl: LINKEDIN,
    content: `## The bill nobody budgets for

Every security company that installs cameras eventually meets the same wall: someone has to watch the feeds. That means a room, screens, staff on rotation, supervisors, backup staff for sick days, and software licences. It is the most expensive line in the budget, and it is fixed whether you have ten cameras or a thousand.

I talk to security agency owners and integrators about this every week. The pattern is always the same. They sold the contract. They installed the hardware. And now they are paying for a monitoring room that runs at a fraction of its capacity most of the night.

## What white-label actually means

White-label monitoring is simple to describe. Your company keeps the client, the contract, and the brand. We sit behind your cameras as your operations team. When an operator sees something, the alert, the call, and the report all carry your name.

- Your clients never hear ours.
- Your pricing stays yours.
- We stay invisible or visible, whatever the contract needs.

This is the model I reported on LinkedIn when I wrote about US security agencies cutting monitoring costs dramatically with white-label surveillance. The savings do not come from cutting quality. They come from sharing one properly staffed operations floor across many companies instead of each company building its own half-empty one.

## Where the cost difference comes from

1. Staffing by shift demand, not by headcount pride: a shared floor scales operators with the actual alert volume.
2. No capital spend: screens, video walls, redundancies and software already exist.
3. No recruitment gap: covering a sick night shift is our problem, not your emergency.

> Cost reduction is only half the story. The other half is coverage you could not previously afford.

## What to check before you sign with any monitoring partner

- Ask who is watching at 04:00 and how many screens each operator covers.
- Ask for the escalation script: who calls whom, in how many minutes.
- Ask whether audio intervention is included or priced per event.
- Ask for a live demo of their floor, not a sales deck.

A monitoring partner should pass those four questions without flinching. If you are an integrator or agency owner working through this decision, send me a message and I will walk you through how Your Tech Eye runs it.`,
  },
  {
    slug: "a-camera-should-protect-your-present-not-record-your-history",
    title: "A camera should protect your present, not record your history",
    excerpt:
      "Most CCTV systems are built to answer one question after the loss is done: what happened? Active monitoring flips the question to while it is happening: what do we do about it right now?",
    coverImage: "/media/watcher-portrait-bw.webp",
    tags: "active monitoring, threat detection, CCTV, verification",
    author: "Md Al-Amin",
    readMinutes: 4,
    publishedAt: "2026-10-13T04:00:00.000Z",
    sourceUrl: LINKEDIN,
    content: `## Recording is not protection

A camera that only records is a witness that never speaks. It watches the theft, the trespass, the damaged fence, and it says nothing until you play the file back, after everything is already gone.

I keep repeating one line because the industry keeps needing to hear it: a camera should do more than record history. It should protect your present.

## From passive recording to active detection

The shift happening in surveillance right now is from passive recording to active threat detection. Modern systems add motion analytics, loitering detection, line crossing, and object detection on top of the raw feed. That is progress. But software is only the first half.

- Analytics flag motion. They do not judge intent.
- Every system that auto-alerts also auto-cries-wolf, and staff start ignoring it.
- The difference between a real intruder and a cat is still a human judgement call.

That judgement call is the entire product. An alert that nobody verifies is noise. A verified alert is an incident you can act on in seconds: a voice on the loudspeaker, a call to your guard, a call to the police with a confirmed description.

## What the loop looks like in practice

1. The camera or the operator notices something: movement in a yard that should be empty.
2. An operator verifies within seconds: is this a person, what are they doing, where are they heading.
3. If it is a threat, intervention starts while it is happening: talk-down audio, alerts to your people, escalation per the agreed plan.
4. Everything is logged so you get a clean report, not a fuzzy screenshot the next morning.

> The value was never in the camera. It is in the person watching it and the speed of the response.

Stop paying for evidence of losses that already happened. Put someone behind the glass.`,
  },
  {
    slug: "the-human-element-why-software-alone-does-not-stop-a-break-in",
    title: "The human element: why software alone does not stop a break-in",
    excerpt:
      "AI detection reduced our false alarms, and it is still not enough on its own. The moment that actually stops a loss is always a person deciding to act.",
    coverImage: "/media/operator-screens-profile.webp",
    tags: "human element, security operations, AI detection, response",
    author: "Md Al-Amin",
    readMinutes: 4,
    publishedAt: "2026-10-06T04:00:00.000Z",
    sourceUrl: LINKEDIN,
    content: `## The industry loves to promise the algorithm

Security marketing right now is a race to say AI louder. Detection, classification, prediction. We run modern analytics too, and they genuinely help: they filter the empty-yard-on-a-windy-day alerts that used to bury operators.

But I have watched enough night shifts to say this plainly: software sees pixels. People see intent.

## Three things only the human does

1. **Context.** A person walking between two trucks in a logistics yard at 15:00 is staff. The same figure at 02:30 moving along the fence line is a problem. No model holds that context the way an operator briefed on your site does.
2. **Decision.** Someone has to decide: is this worth waking the owner, calling the guard, dispatching police, or speaking through the speaker. That decision carries consequence, and it is a human responsibility.
3. **Communication.** When a voice comes through a loudspeaker and names exactly what the intruder is doing, the tone, the timing, and the wording decide whether the intruder leaves. That is a person, in the moment, doing the work.

## The stack that actually works

The strongest setup we run is boring and layered:

- Analytics to watch every frame so humans do not have to.
- Trained operators to verify what the analytics flag and to watch the feeds that matter.
- An escalation plan agreed with you in advance, so nobody improvises at 03:00.

> Cost reduction is only half the story. The other half is the judgment you cannot automate.

If your current system sends alerts that nobody verifies, you do not have detection. You have notifications. Talk to us and we will show you the difference on your own cameras.`,
  },
  {
    slug: "audio-intervention-the-voice-that-ends-a-break-in-before-it-starts",
    title: "Audio intervention: the voice that ends a break-in before it starts",
    excerpt:
      "A case-style walk-through of live audio talk-down: what the operator sees, what they say, and why most intruders leave within seconds of being addressed personally.",
    coverImage: "/media/garage-ramp-amber.webp",
    tags: "audio intervention, case study, deterrence, response",
    author: "Md Al-Amin",
    readMinutes: 4,
    publishedAt: "2026-09-29T04:00:00.000Z",
    sourceUrl: LINKEDIN,
    content: `## 02:41, an empty parking structure

The scene below is drawn from the kind of night we handle routinely. Details are generic on purpose: what matters is the sequence.

An operator is watching a multi-level parking structure. Two figures enter through the ramp on level two, moving between pillars, away from the cameras' usual sightlines. Analytics flagged them first: movement in a no-access zone after hours.

## The verification pass

Before anything loud happens, the operator does the quiet work:

- Are these cleaners, security, or someone with a reason to be there? The schedule says no.
- What are they carrying? One of them is holding something flat and long.
- Where are they heading? Straight toward the payment equipment row.

Verification takes seconds because the operator already knows the site: the plans, the blind spots, the access schedule. This is why monitoring is built around the site, not sold out of a box.

## The talk-down

The operator keys the speaker. The voice is calm, loud, and specific: it names the level, the behaviour, and the fact that they are on live camera, and that the response is already in motion.

Most intruders operate on one assumption: nobody is watching. A human voice removes that assumption instantly. There is nothing to steal fast enough to make the risk worth it. In the overwhelming majority of cases, they leave the way they came, at a pace worth logging.

## After the voice

- Alerts go out to the client's contacts per the escalation plan.
- The event is clipped, timestamped, and written into the morning report.
- If the figures had stayed, the next step would have been a call to local police with a live description: verified human intelligence, not a motion ping.

> A speaker is hardware. A calm voice that knows your site is a deterrent.

If your cameras can hear, they can defend. Ask us whether your site is ready for audio intervention.`,
  },
  {
    slug: "playback-review-catch-what-live-watch-cannot",
    title: "Playback review: the quiet service that catches what live watch cannot",
    excerpt:
      "Not every loss happens in front of a live operator. Playback review reconstructs events after the fact: shrinkage patterns, access anomalies, damage disputes. Here is how we run it.",
    coverImage: "/media/parking-garage-stripes.webp",
    tags: "playback review, footage monitoring, investigations, loss prevention",
    author: "Md Al-Amin",
    readMinutes: 4,
    publishedAt: "2026-09-22T04:00:00.000Z",
    sourceUrl: LINKEDIN,
    content: `## Live watch is one product. Memory is another.

Live monitoring gets the attention, and it should: intervening in the moment is what saves the loss. But a well-run operation also needs someone who can go back through the hours and find the things nobody was looking at when they happened.

That is playback review, and it is more useful than most owners realise before their first report arrives.

## What playback review actually answers

1. **Shrinkage patterns.** Stock numbers move, but nobody can say when. Review across shifts finds the window, the till, the door.
2. **Access anomalies.** A badge that opens the warehouse at unusual hours. A tailgater at the loading dock. The recorder saw all of it; nobody was watching that feed.
3. **Disputes and claims.** Damage to vehicles, slips, arguments at the gate. A clean clip with timestamps settles most of these before they become expensive.
4. **Verification of live response.** After every intervention we review our own handling: response times, what was seen first, what could have been caught earlier. This is how monitoring gets better instead of just being sold.

## How we run a review

- You give us the window and the question: this stockroom, that weekend, these exits.
- Reviewers sweep the feeds at speed, flag anything relevant, and cut exact clips.
- You receive a written report with timestamps and clips, not a promise that someone had a look.

> The recording already exists. Unwatched, it is storage cost. Reviewed, it is evidence and pattern.

## When to use it

- After any incident, to complete the picture beyond the live response.
- On a schedule: weekly sweeps of high-risk areas for repeat sites.
- Before renewals and insurance discussions: documented history strengthens your position.

If your cameras have been recording faithfully for months and nobody has truly reviewed them, you are sitting on unopened evidence. Send us a window of time and a question, and we will show you what a proper review finds.`,
  },
];

async function main() {
  for (const p of posts) {
    const existing = await db.blogPost.findUnique({ where: { slug: p.slug } });
    if (existing) {
      await db.blogPost.update({
        where: { slug: p.slug },
        data: {
          title: p.title,
          excerpt: p.excerpt,
          content: p.content,
          coverImage: p.coverImage,
          tags: p.tags,
          author: p.author,
          sourceUrl: p.sourceUrl,
          readMinutes: p.readMinutes,
          status: "published",
          publishedAt: new Date(p.publishedAt),
        },
      });
      console.log("updated:", p.slug);
    } else {
      await db.blogPost.create({
        data: {
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          content: p.content,
          coverImage: p.coverImage,
          gallery: "[]",
          tags: p.tags,
          author: p.author,
          sourceUrl: p.sourceUrl,
          readMinutes: p.readMinutes,
          status: "published",
          publishedAt: new Date(p.publishedAt),
        },
      });
      console.log("created:", p.slug);
    }
  }
  console.log("seed complete:", posts.length, "posts");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
