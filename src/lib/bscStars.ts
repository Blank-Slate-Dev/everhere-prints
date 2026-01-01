export type BscStarRaw = {
  RA: string;   // "00h 08m 23.3s"
  Dec: string;  // "+29° 05′ 26″"
  V: string;    // "2.06"
  HR?: string;
  K?: string;
  N?: string;   // name (optional)
  B?: string;   // Bayer (optional)
  C?: string;   // constellation (optional)
  F?: string;   // Flamsteed (optional)
};

export type Star = {
  id: string;
  raDeg: number;     // 0..360
  decDeg: number;    // -90..+90
  mag: number;       // smaller = brighter
  name?: string;
  tempK?: number;
};

function parseHmsToDeg(hms: string): number {
  // "00h 08m 23.3s"
  const m = hms.trim().match(/^(\d+)h\s+(\d+)m\s+([\d.]+)s$/);
  if (!m) return NaN;
  const h = Number(m[1]);
  const min = Number(m[2]);
  const s = Number(m[3]);
  const hours = h + min / 60 + s / 3600;
  return (hours * 15) % 360;
}

function parseDmsToDeg(dms: string): number {
  // "+29° 05′ 26″" or "-00° 30′ 11″"
  const m = dms.trim().match(/^([+-])?(\d+)°\s+(\d+)′\s+(\d+)″$/);
  if (!m) return NaN;
  const sign = m[1] === "-" ? -1 : 1;
  const deg = Number(m[2]);
  const min = Number(m[3]);
  const sec = Number(m[4]);
  return sign * (deg + min / 60 + sec / 3600);
}

export async function loadBscStars(options?: { maxMag?: number }): Promise<Star[]> {
  const res = await fetch("/data/bsc5-short.json");
  if (!res.ok) throw new Error(`Failed to load BSC stars: ${res.status}`);
  const raw: BscStarRaw[] = await res.json();

  const maxMag = options?.maxMag ?? 6.5; // tweak: lower = fewer stars
  const out: Star[] = [];

  for (const s of raw) {
    const mag = Number(s.V);
    if (!Number.isFinite(mag) || mag > maxMag) continue;

    const raDeg = parseHmsToDeg(s.RA);
    const decDeg = parseDmsToDeg(s.Dec);
    if (!Number.isFinite(raDeg) || !Number.isFinite(decDeg)) continue;

    const name = s.N ?? (s.B && s.C ? `${s.B} ${s.C}` : undefined);

    out.push({
      id: `HR${s.HR ?? "?"}-${s.RA}-${s.Dec}`,
      raDeg,
      decDeg,
      mag,
      name,
      tempK: s.K ? Number(s.K) : undefined,
    });
  }

  return out;
}
