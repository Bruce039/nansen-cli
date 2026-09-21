/**
 * Compare two semver strings. Returns 1 if a > b, -1 if a < b, 0 if equal.
 *
 * A missing trailing component is treated as 0 ("1.43" reads as "1.43.0"),
 * not as `undefined` — `undefined` would make every `>` comparison against it
 * false in both directions, so a version that matches on major.minor always
 * came out "less than" a value that only specified major.minor (e.g.
 * `compareSemver('1.43.1', '1.43')` fell through to comparing `1 > undefined`,
 * which is false, so it returned -1 instead of 1).
 *
 * Shared by `nansen changelog --since` (src/cli.js) and the update-notifier's
 * version check (src/update-check.js) so both compare versions the same,
 * correct way instead of each hand-rolling its own parser.
 */
export function compareSemver(a, b) {
  // A prerelease or build suffix ("1.2.10-beta.1", "1.2.10+sha") used to be
  // parsed with Number(), which turned the suffixed component into NaN and
  // then into 0 — so "1.2.10-beta" compared below "1.2.9". Split the suffix
  // off first and read each component as a plain integer. A prerelease
  // ranks below the release it precedes; two prereleases of the same core
  // compare equal, which is all the callers here need.
  const parse = v => {
    const str = String(v).replace(/^v/, '');
    const dash = str.search(/[-+]/);
    const core = dash === -1 ? str : str.slice(0, dash);
    const prerelease = dash !== -1 && str[dash] === '-';
    const parts = core.split('.').map(p => parseInt(p, 10));
    return [parts[0] || 0, parts[1] || 0, parts[2] || 0, prerelease];
  };
  const [aM, am, ap, aPre] = parse(a);
  const [bM, bm, bp, bPre] = parse(b);
  if (aM !== bM) return aM > bM ? 1 : -1;
  if (am !== bm) return am > bm ? 1 : -1;
  if (ap !== bp) return ap > bp ? 1 : -1;
  if (aPre !== bPre) return aPre ? -1 : 1;
  return 0;
}
