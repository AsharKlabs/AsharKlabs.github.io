<script setup>
/**
 * Why CODOT moved from a hybrid player to native Kotlin.
 * Plain engineer prose. No confidential client internals.
 */
</script>

<template>
  <article class="prose-case">
    <section>
      <h2>The situation</h2>
      <p>
        CODOT’s playback client started as a hybrid app: native shell, web-tech player
        surface. That got us onto devices fast. Schedules rendered, media played, operators
        could push updates without waiting on store review cycles for every UI tweak. For a
        growing signage fleet, shipping speed mattered.
      </p>
      <p>
        The job looked simple from outside — show the right creative on a screen that stays
        on for hours. Inside, it was long-running media, weak networks, mixed hardware, and
        a device that might not see a human for weeks.
      </p>
    </section>

    <section>
      <h2>What happened</h2>
      <p>
        Under real installs, the hybrid ceiling showed up as reliability debt. Playback
        glitches that were hard to reproduce in a browser. Memory pressure after long
        uptime. Edge cases where the WebView’s idea of “still playing” diverged from what
        the screen showed. Remote diagnosis meant squinting at logs that lived half in
        native land and half in the web runtime.
      </p>
      <p>
        None of that meant hybrid was a mistake for v1. It meant the failure mode had
        changed: we weren’t proving the product anymore. We were burning time on a stack
        that fought the workload.
      </p>
    </section>

    <section>
      <h2>What we found</h2>
      <p>
        Signage isn’t a session-based mobile app. It’s closer to an unattended appliance.
        You want deterministic media pipelines, predictable process lifetime, and fewer
        layers between “decoder” and “pixels.” The hybrid path kept paying a tax on every
        one of those.
      </p>
      <p>
        We also found the update story was split-brained: shell updates versus web bundle
        updates, each with different failure modes. When a player misbehaved in the field,
        “was it the WebView, the JS, or the native bridge?” was the wrong first question to
        ask at 2 a.m.
      </p>
    </section>

    <section>
      <h2>What I decided</h2>
      <p>
        We rewrote the player as a native Kotlin client. Same product job — schedules,
        media, heartbeat to the control plane — fewer moving parts on the device. Native
        media APIs, one process model, crashes and ANRs that pointed at our code instead of
        a browser engine version matrix.
      </p>
      <p>
        What we accepted losing: some of the web-tier iteration speed. Content and CMS could
        still move fast server-side; the player itself would ship more like firmware.
        What we refused to keep losing: opaque playback failures and overnight memory death
        on boxes we couldn’t casually reboot.
      </p>
      <p>
        How I knew it was worth it wasn’t a slide about “native performance.” It was a
        short list of field incidents we could no longer afford, plus a prototype that
        survived a soak test the hybrid build kept failing. If the rewrite hadn’t cleared
        those, I’d have stopped. Pride isn’t a reason to throw away a working hybrid.
      </p>
      <p>
        Wrong turn early: trying to salvage the hybrid with more bridging and stricter
        watchdog timers. That delayed the rewrite and taught us less than a thin native
        spike would have.
      </p>
    </section>

    <section>
      <h2>The outcome</h2>
      <p>
        The Kotlin player became the path we trusted for the fleet. Playback behaviour got
        easier to reason about. Support conversations shifted from “WebView mystery” to
        application logs and device health we owned end to end. Rollouts were heavier than
        pushing a web bundle — and more honest about what actually changed on the device.
      </p>
    </section>

    <section>
      <h2>What changed afterwards</h2>
      <p>
        Release discipline tightened: soak tests before wide fleets, staged rollouts, and a
        clearer split between server-driven content and client capability. Hybrid hadn’t
        been wrong for discovery. It was wrong as the forever runtime for unattended video
        walls.
      </p>
      <p>
        The lesson: choose the stack for the failure mode you actually have. A hybrid
        player optimises for shipping UI. A native player optimises for surviving Tuesday
        at 3 a.m. with no one in the building. We needed the second.
      </p>
    </section>
  </article>
</template>
