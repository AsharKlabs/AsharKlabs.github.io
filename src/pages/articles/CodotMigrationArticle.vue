<script setup>
/**
 * CODOT Bahrain → Mumbai emergency migration write-up.
 * Plain engineer prose. No confidential client internals.
 */
</script>

<template>
  <article class="prose-case">
    <section>
      <h2>The situation</h2>
      <p>
        CODOT was a distributed digital signage platform. Roughly 250 player devices across
        Bahrain and Oman pulled schedules and media from a control plane in AWS Bahrain.
        Screens in retail and public spaces ran continuously. Operators used a management
        dashboard to push ads, check device health, and watch playback status in near
        real time.
      </p>
      <p>
        The stack wasn’t exotic: cloud compute and storage in-region, object media for the
        fleet, and a WebSocket path so devices and the dashboard could talk without polling
        themselves to death. What mattered was continuity. If the region went dark, the
        screens didn’t just show an error page — they stopped being a product.
      </p>
    </section>

    <section>
      <h2>What happened</h2>
      <p>
        During the Iran conflict, the physical data centres serving AWS Bahrain were
        destroyed. This wasn’t a partial outage or a single AZ blip. The region as we
        depended on it was gone.
      </p>
      <p>
        The first signal on our side wasn’t a calm status banner. Devices stopped checking
        in. The dashboard went quiet. Operators couldn’t reach the control plane. By the
        time regional reality was clear, “wait it out” was no longer a plan — there was
        nothing left in Bahrain to wait for.
      </p>
    </section>

    <section>
      <h2>What we found</h2>
      <p>
        The assessment was blunt. There were no recoverable backups we could use to stand
        the platform back up elsewhere. Whatever we had treated as “backed up enough” for
        ordinary failures did not survive losing the region itself.
      </p>
      <p>
        That meant more than empty S3 prefixes. Database state we needed for devices and
        schedules wasn’t coming back from a snapshot. DNS and clients still pointed at a
        dead region. Device configuration lived in a mix of server-side state and what each
        player already held locally — enough to keep some screens showing stale content for
        a while, not enough to rebuild the system of record.
      </p>
      <p>
        The constraint set was simple and ugly: rebuild in another region, from scratch,
        with a live fleet that still expected to be managed, and with no golden copy of the
        old world to restore from.
      </p>
    </section>

    <section>
      <h2>What I decided</h2>
      <p>
        We moved to AWS Mumbai. Latency to the Gulf was acceptable for the control plane and
        media path we needed, capacity was available, and it was a region we could stand up
        quickly without inventing a new cloud provider relationship in the middle of an
        incident. Perfect wasn’t the goal. Reachable and rebuildable was.
      </p>
      <p>
        Order of work mattered more than slogans. I restored the control plane before the
        media pipeline. A device you can reach but that has nothing new to play is
        recoverable. A device you can’t reach is a brick on a wall until someone walks up
        to it. Authentication, device registration, and the dashboard path came first so we
        could see the fleet again and push configuration. By hour six we had a control plane
        answering in Mumbai — thin, incomplete, but addressable.
      </p>
      <p>
        Then storage and media. Oman still needed object delivery where native AWS bucket
        support wasn’t available the way we needed it, so the MinIO path we’d used as a
        sovereign workaround stayed part of the design rather than a footnote. The
        WebSocket and Coturn layer came back so telemetry and low-latency paths between
        dashboard and players worked again — not because streaming was the emotional
        headline, but because a fleet you can’t observe is a fleet you can’t finish
        recovering.
      </p>
      <p>
        We didn’t bring every device back in one heroic flip. Batches reduced blast radius
        when something in the new stack was wrong. That cost time. It also meant a bad
        config didn’t take the entire 250+ fleet offline again while we were still learning
        the new region’s shape.
      </p>
      <p>
        Things I got wrong early: I underestimated how much “local last-known media” would
        mask how broken the control plane still was. Screens that looked fine were not
        proof of recovery. I also spent cycles chasing restore paths that didn’t exist —
        hoping for a backup we’d treat as optional until it was the only thing that
        mattered. That hope burned hours. Naming the gap earlier would have moved Mumbai
        cutover forward.
      </p>
    </section>

    <section>
      <h2>The outcome</h2>
      <p>
        Over the following days, service came back in Mumbai. The management path worked
        again. Over 250 devices reconnected across the fleet — not in one cutover, but as
        batches cleared. Not everything from the old region returned — some historical state
        and media simply weren’t recoverable without backups — and pretending otherwise
        wouldn’t make the recovery cleaner.
      </p>
      <p>
        What we had at the end was a running platform in a new region, a fleet that could
        be managed again, and a clear record of what permanent loss looks like when backup
        is an assumption instead of a tested design.
      </p>
    </section>

    <section>
      <h2>What changed afterwards</h2>
      <p>
        After the dust settled, the useful work was boring on purpose: backup and restore
        that you can actually run, cross-region thinking for the control plane, monitoring
        that notices a silent fleet before a client does, and a written path for “region is
        gone” that doesn’t start with improvisation.
      </p>
      <p>
        Not every recommendation ships. I documented the exposure and pushed for
        cross-region snapshots and a restore drill. Some of that landed; some of it
        competed with other roadmap priorities. Saying that out loud matters. Surviving an
        incident doesn’t automatically mean the organisation funded every hardening item
        the incident proved you needed.
      </p>
      <p>
        The lesson I kept: the failure wasn’t only that a data centre was destroyed. That
        can happen. The failure was that we’d treated backup as an ops checkbox — something
        you enable and forget — instead of a design requirement with a restore story you’d
        be willing to execute under stress. Regions fail in more ways than instance
        reboots. Design for the boring restore, or you’ll rebuild from memory when it
        counts.
      </p>
    </section>
  </article>
</template>
