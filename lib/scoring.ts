import { Guest, Criteria } from '@/stores/useEventsStore';

export function scoreGuest(guest: Guest, criteria: Criteria[]): {
  score: number;
  breakdown: Record<string, number>;
} {
  const breakdown: Record<string, number> = {};
  let totalScore = 0;
  let totalWeight = 0;

  criteria.forEach((criterion) => {
    const weight = criterion.weight / 100;
    let fieldScore = 0;

    // Simple scoring heuristics based on criterion key
    switch (criterion.key) {
      case 'industryFit':
        fieldScore = guest.company ? 0.8 : 0.3;
        break;
      case 'roleSeniority':
        const title = guest.title?.toLowerCase() || '';
        fieldScore = title.includes('ceo') || title.includes('founder') ? 1.0 :
                    title.includes('director') || title.includes('vp') ? 0.8 :
                    title.includes('manager') ? 0.6 : 0.4;
        break;
      case 'companySize':
        fieldScore = guest.company ? Math.random() * 0.4 + 0.6 : 0.3;
        break;
      case 'previousAttendance':
        fieldScore = guest.history && guest.history.length > 0 ? 0.9 : 0.2;
        break;
      case 'engagementScore':
        fieldScore = Math.random() * 0.3 + 0.5;
        break;
      case 'geoProximity':
        fieldScore = guest.city ? 0.7 : 0.4;
        break;
      case 'diversityGoals':
        fieldScore = Math.random() * 0.4 + 0.6;
        break;
      case 'referrals':
        fieldScore = guest.tags?.includes('referral') ? 0.9 : 0.3;
        break;
      default:
        fieldScore = Math.random() * 0.4 + 0.5;
    }

    const weightedScore = fieldScore * weight;
    breakdown[criterion.key] = Math.round(fieldScore * 100);
    totalScore += weightedScore;
    totalWeight += weight;
  });

  const finalScore = totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
  
  return {
    score: Math.round(finalScore),
    breakdown,
  };
}

export function rescoreAll(guests: Guest[], criteria: Criteria[]): Guest[] {
  return guests.map((guest) => {
    const { score, breakdown } = scoreGuest(guest, criteria);
    return {
      ...guest,
      score,
      scoreBreakdown: breakdown,
    };
  });
}