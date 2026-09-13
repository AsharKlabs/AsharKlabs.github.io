<script setup>
/**
 * Why MinIO for CODOT in Oman.
 * Plain engineer prose. No confidential client internals.
 */
</script>

<template>
  <article class="prose-case">
    <section>
      <h2>The situation</h2>
      <p>
        CODOT’s Oman fleet needed the same thing Bahrain devices already had: object storage
        for schedules and media, reachable over a stable S3-shaped API. Players expected to
        pull assets, cache locally, and keep screens running without a human on site. The
        control plane already spoke “bucket + key.” Changing that contract for one country
        was expensive in code and in ops.
      </p>
      <p>
        Oman didn’t give us a clean native AWS object store in-country the way we needed it.
        That wasn’t a preference debate. It was a hard edge: residency, latency, and “what
        happens when the WAN blips” all mattered for screens that were supposed to look
        intentional, not buffering.
      </p>
    </section>

    <section>
      <h2>What happened</h2>
      <p>
        As Oman sites came online, the default instinct was to keep everything on AWS and
        pull media across the Gulf. That worked in demos. It looked worse under real
        schedules: larger assets, more devices, and links that weren’t always kind. A
        player that can’t refresh content isn’t “slightly delayed” — it’s stuck on stale
        ads or a black screen until someone notices.
      </p>
      <p>
        We needed object storage that behaved like S3 for the rest of the stack, lived
        close to the devices, and didn’t force a second media pipeline just for Oman.
      </p>
    </section>

    <section>
      <h2>What we weighed</h2>
      <p>
        The options were short. Keep serving from the AWS region we already used and pay in
        latency plus egress. Put a CDN in front and hope edge behaviour matched how players
        cached and authenticated. Or run an S3-compatible store ourselves in Oman — MinIO on
        infrastructure we controlled — and keep the same SDK paths the Bahrain side already
        used.
      </p>
      <p>
        CDN looked tidy on a whiteboard. For our access patterns and device software, it
        still meant proving auth, cache invalidation, and failure modes we didn’t want to
        discover in a mall at Friday peak. Pure AWS remote buckets meant every Oman miss
        depended on a cross-border hop. MinIO meant we owned the box: disk, versions,
        credentials, and the 3 a.m. page when disk filled up.
      </p>
    </section>

    <section>
      <h2>What I decided</h2>
      <p>
        We ran MinIO in Oman and kept the S3 API as the contract. Players and backend code
        didn’t need an Oman-only fork. Ops cost was real — compute, disks, monitoring,
        backups of the store itself — but it was a cost we could see on a invoice line and
        a dashboard, not a hidden tax in “why is this site always on yesterday’s playlist.”
      </p>
      <p>
        Trade-off I accepted: we became the storage operator for that geography. Trade-off I
        refused: a second media protocol or a permanent WAN dependency for routine asset
        pulls. Compatibility beat novelty. MinIO wasn’t chosen because it was fashionable;
        it was chosen because it spoke the API we already had and could sit next to the
        fleet.
      </p>
      <p>
        Early mistake: treating “S3-compatible” as “ops-identical to AWS.” Bucket policies,
        disk growth, and restore drills are your problem on day one. We tightened monitoring
        after the first near-full volume, not before.
      </p>
    </section>

    <section>
      <h2>The outcome</h2>
      <p>
        Oman devices pulled media from a local MinIO endpoint with the same client patterns
        as the AWS path. Cross-border chatter dropped for routine assets. The platform
        stayed one product with two storage backends behind one interface — messier than a
        single-cloud story, but honest about geography.
      </p>
      <p>
        What it cost to run was ongoing: machines, storage growth with the catalog, and
        someone accountable when the store degraded. That cost was still cheaper than
        unreliable playback and a custom Oman stack.
      </p>
    </section>

    <section>
      <h2>What changed afterwards</h2>
      <p>
        We documented the Oman store as a first-class dependency — health checks, disk
        alerts, access keys rotation, and a restore story that wasn’t “re-upload from
        someone’s laptop.” When the wider Bahrain incident later forced a Mumbai rebuild,
        the MinIO path stayed part of the design instead of a one-off exception we’d
        forgotten how to explain.
      </p>
      <p>
        The lesson: if your devices live in a place your cloud doesn’t, “just use S3”
        isn’t an architecture — it’s a hope. Either accept the WAN as a product constraint
        or put an S3-shaped store where the screens are and budget for operating it.
      </p>
    </section>
  </article>
</template>
