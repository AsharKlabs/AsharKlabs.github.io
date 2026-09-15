<script setup>
/**
 * CODOT Bahrain → Mumbai emergency migration write-up.
 * Plain engineer prose. No confidential client internals.
 */
</script>

<template>
  <article class="prose-case">
    <section>
      <p>
        CODOT is a digital signage platform. Around 250 player devices across Bahrain and
        Oman, each pulling scheduled media and reporting status back to a dashboard where
        operators change what's on screen. The whole thing ran out of a single AWS region:
        EC2 for the application, RDS for the database, S3 for media.
      </p>
      <p>It had run that way for a long time without incident.</p>
    </section>

    <section>
      <h2>The warning we didn't take</h2>
      <p>Staging went down first.</p>
      <p>
        The instance stopped responding and wouldn't come back. We looked at it, couldn't
        get in, and made a decision that seemed reasonable at the time: staging is staging.
        It's a lower-tier environment, things break there, and production was running fine.
        We'd deal with it when we had a window.
      </p>
      <p>Production went down three to five days later.</p>
      <p>
        I've thought about that gap more than any other part of this. It wasn't that we
        lacked the information — the information was sitting there for the better part of a
        week. We just read it as an isolated failure rather than as the first one.
      </p>
    </section>

    <section>
      <h2>Finding out</h2>
      <p>The client called the PM. The PM called me.</p>
      <p>
        By the time I looked, the EC2 instance was down and wouldn't restart. SSH wouldn't
        connect. There was no login to recover, no console to get into, no
        degraded-but-alive state to work from. The instance wasn't sick. It was gone.
      </p>
      <p>Regional data centres had been destroyed during the Iran conflict.</p>
    </section>

    <section>
      <h2>The part that actually mattered</h2>
      <p>
        Losing compute is survivable. You rebuild compute. What I needed was the data.
      </p>
      <p>
        We had RDS snapshots. We had been taking them. They were in the same region as the
        database they were backing up.
      </p>
      <p>
        That is the whole lesson of this incident, and I'd rather state it plainly than
        dress it up: a snapshot stored next to the thing it protects is not a backup. It
        covers you against deletion, corruption, and human error. It does not cover you
        against the region ceasing to exist. We had confused "we take backups" with "we can
        recover," and those are different claims.
      </p>
      <p>
        Nothing was recoverable. Not partially, not with effort. The snapshots were on the
        wrong side of the same failure.
      </p>
    </section>

    <section>
      <h2>Choosing Mumbai</h2>
      <p>Two reasons, in order.</p>
      <p>
        Latency. Devices and operators are in Bahrain and Oman. Mumbai is the closest AWS
        region with the capacity we needed, so the round trip for dashboard commands and
        device telemetry stays short. Signage tolerates some latency, but the management
        side shouldn't feel sluggish when an operator changes a playlist.
      </p>
      <p>
        Distance from the conflict. Whatever the probability of a repeat, it wasn't zero,
        and it wasn't independent of geography. Moving to another Gulf region would have
        kept the same correlated risk.
      </p>
    </section>

    <section>
      <h2>Rebuilding</h2>
      <p>From nothing, in order:</p>
      <ol>
        <li>VPC and subnets</li>
        <li>
          Security groups — one default for production, then a pair scoped to the EC2-to-RDS
          path in both directions
        </li>
        <li>Key pair</li>
        <li>EBS volume</li>
        <li>EC2 instance, no public IP</li>
        <li>Elastic IP allocated and associated</li>
        <li>S3 bucket, IAM role, role attached to the instance</li>
        <li>
          RDS subnet group, then RDS, with the security group rules opened for the EC2
          connection
        </li>
      </ol>
      <p>
        Roughly a day. The sequence matters more than the individual steps — subnets before
        security groups, the RDS subnet group before RDS, the IAM role attached before the
        application goes looking for S3.
      </p>
      <p>
        Day two was the application: deploying the stack and re-importing media into the new
        S3 bucket. Day three was the WebSocket server for device telemetry and live control.
      </p>
      <p>
        Three days of building, five days end to end including the assessment and the
        waiting.
      </p>
    </section>

    <section>
      <h2>What came back and what didn't</h2>
      <p>
        Once the stack was live and DNS moved, the devices reconnected on their own. That
        was the one piece of good design carrying us: the players were built to find the
        server rather than to be told where it was. Nobody had to drive to a mall in Manama
        and re-provision a screen by hand. Given how much of this incident went badly, it's
        worth naming the part that went right.
      </p>
      <p>
        What didn't come back: player registration data, playback content records, and the
        media library. The client specifically asked for the player data — that was the one
        thing they wanted salvaged. I couldn't produce it. Everything had to be re-entered
        and re-uploaded from their side.
      </p>
    </section>

    <section>
      <h2>Afterwards</h2>
      <p>I recommended cross-region backup once we were stable.</p>
      <p>It wasn't adopted. The added cost wasn't considered justified.</p>
      <p>
        I understand the reasoning — cross-region replication is a recurring bill against a
        risk that had, at that point, already happened once and felt unlikely to happen
        again. But I think that framing is wrong, and I'd argue it harder now than I did
        then. The cost of cross-region snapshots is a known monthly number. The cost of the
        incident was three days of engineering, five days of a dead platform for 250
        devices, and a client's entire operational dataset gone permanently. Those are not
        the same order of magnitude, and the second one is the one you can't budget for
        after the fact.
      </p>
      <p>If the decision were mine alone, I'd take the storage cost.</p>
    </section>

    <section>
      <h2>What I'd do differently</h2>
      <p>
        <strong>Treat a staging failure as a production signal.</strong>
        Same region, same underlying infrastructure, same everything except the traffic.
        When staging dies for reasons you can't explain, you have not learned that staging
        is fragile. You've learned something about the substrate both environments sit on.
      </p>
      <p>
        <strong>Verify the blast radius of your backups, not just their existence.</strong>
        The question isn't "do we have snapshots." It's "what single event takes out both
        the primary and the backup." If there's an answer to that question, you don't have
        a backup — you have a copy.
      </p>
      <p>
        <strong>Write down the rebuild before you need it.</strong>
        I reconstructed that VPC-to-RDS sequence from knowledge under pressure. It worked,
        but a runbook would have made day one closer to half a day, and it would have made
        the work transferable to someone who wasn't me.
      </p>
    </section>
  </article>
</template>
