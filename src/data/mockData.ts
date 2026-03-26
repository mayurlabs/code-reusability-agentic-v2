/* ─── Interfaces ─── */

export interface ScanReport {
  id: string;
  name: string;
  requestedBy: string;
  requestedDate: string;
  startTime: string;
  endTime: string;
  environment: string;
  orgId: string;
  scope: string[];
  runtimeEnrichment: boolean;
  reportVersion: string;
  status: 'Complete' | 'In Progress' | 'Failed' | 'Draft';
  score: number | null;
  scoreDelta: number | null;
}

export interface CodeLine {
  lineNum: number;
  text: string;
  matchType: 'identical' | 'similar' | 'different' | 'unique';
}

export interface DependencyInfo {
  inboundCount: number;
  outboundCount: number;
  topCallers: string[];
  topDependencies: string[];
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Unknown';
  migrationReady: boolean;
}

export interface ClusterMember {
  id: string;
  name: string;
  surface: string;
  owner: string;
  lastModified: string;
  usageState: string;
  loc: number;
  similarity: number;
  badge: string;
  invocations30d: number;
  invocations90d: number;
  activePaths: number;
  lastObserved: string;
  runtimeConfidence: string;
  dependencies: DependencyInfo;
  codeLines?: CodeLine[];
}

export interface Cluster {
  id: string;
  name: string;
  surface: string;
  type: 'Exact Duplicate' | 'Near Duplicate' | 'Pattern Family';
  similarityRange: string;
  memberCount: number;
  runtimePriority: 'High' | 'Medium' | 'Low' | 'N/A';
  recommendation: 'Standardize' | 'Review' | 'Consolidate' | 'Retire Variant' | 'Monitor';
  owner: string;
  lastUpdated: string;
  preferredCandidate: string;
  members: ClusterMember[];
  sharedIntent: string;
  commonBlocks: string[];
  differences: string[];
  whyItMatters: string[];
  whereItAppears: string[];
  estimatedReduction: string;
  rationale: string[];
  nextSteps: string[];
}

export interface AgentMessage {
  id: string;
  role: 'bot' | 'user';
  content: string;
  timestamp: string;
  actions?: { label: string; type: string }[];
}

/* ─── Scan Reports ─── */

export const scanReports: ScanReport[] = [
  {
    id: 'rpt-001',
    name: 'Mar 2026 Code Reuse Report - Northstar Retail Group',
    requestedBy: 'Priya Raman',
    requestedDate: '2026-03-26',
    startTime: '2026-03-26T06:00:00Z',
    endTime: '2026-03-26T06:47:00Z',
    environment: 'Production',
    orgId: '00D5g00000NrSTAR',
    scope: ['ApexClass', 'ApexTrigger', 'LightningComponentBundle', 'AuraDefinitionBundle'],
    runtimeEnrichment: true,
    reportVersion: '2.4.1',
    status: 'Complete',
    score: 78,
    scoreDelta: 9,
  },
  {
    id: 'rpt-002',
    name: 'Mar 2026 Pre-Release Reuse Review',
    requestedBy: 'Priya Raman',
    requestedDate: '2026-03-12',
    startTime: '2026-03-12T07:15:00Z',
    endTime: '2026-03-12T08:02:00Z',
    environment: 'Production',
    orgId: '00D5g00000NrSTAR',
    scope: ['ApexClass', 'ApexTrigger', 'LightningComponentBundle'],
    runtimeEnrichment: true,
    reportVersion: '2.3.0',
    status: 'Complete',
    score: 69,
    scoreDelta: 4,
  },
  {
    id: 'rpt-003',
    name: 'Feb 2026 Monthly Reuse Baseline',
    requestedBy: 'Priya Raman',
    requestedDate: '2026-02-20',
    startTime: '2026-02-20T06:30:00Z',
    endTime: '2026-02-20T07:18:00Z',
    environment: 'Production',
    orgId: '00D5g00000NrSTAR',
    scope: ['ApexClass', 'ApexTrigger'],
    runtimeEnrichment: true,
    reportVersion: '2.2.0',
    status: 'Complete',
    score: 65,
    scoreDelta: 3,
  },
  {
    id: 'rpt-004',
    name: 'Jan 2026 Initial Reuse Baseline',
    requestedBy: 'Priya Raman',
    requestedDate: '2026-01-15',
    startTime: '2026-01-15T08:00:00Z',
    endTime: '2026-01-15T08:45:00Z',
    environment: 'Production',
    orgId: '00D5g00000NrSTAR',
    scope: ['ApexClass', 'ApexTrigger'],
    runtimeEnrichment: false,
    reportVersion: '2.1.0',
    status: 'Complete',
    score: 62,
    scoreDelta: null,
  },
  {
    id: 'rpt-005',
    name: 'Mar 2026 Ad Hoc Sandbox Review',
    requestedBy: 'Daniel Brooks',
    requestedDate: '2026-03-18',
    startTime: '2026-03-18T14:10:00Z',
    endTime: '2026-03-18T14:11:00Z',
    environment: 'Developer Sandbox',
    orgId: '00D5g00000SbxDEV',
    scope: ['ApexClass'],
    runtimeEnrichment: false,
    reportVersion: '2.3.0',
    status: 'Failed',
    score: null,
    scoreDelta: null,
  },
];

/* ─── Clusters ─── */

export const clusters: Cluster[] = [
  {
    id: 'cl-001',
    name: 'Pricing Rules Calculator Variants',
    surface: 'Apex',
    type: 'Near Duplicate',
    similarityRange: '87–94%',
    memberCount: 5,
    runtimePriority: 'High',
    recommendation: 'Standardize',
    owner: 'Revenue Cloud Platform',
    lastUpdated: '2026-03-26',
    preferredCandidate: 'PricingRulesEngineV2.calculateDiscount()',
    members: [
      {
        id: 'cm-001a',
        name: 'PricingRulesEngineV2.calculateDiscount()',
        surface: 'Apex',
        owner: 'Revenue Cloud Platform',
        lastModified: '2026-03-10',
        usageState: 'Active – Primary',
        loc: 22,
        similarity: 94,
        badge: 'Preferred',
        invocations30d: 14820,
        invocations90d: 41500,
        activePaths: 6,
        lastObserved: '2026-03-26T05:48:00Z',
        runtimeConfidence: 'High',
        dependencies: {
          inboundCount: 8,
          outboundCount: 2,
          topCallers: ['QuoteLineItemTrigger', 'OpportunityProductService', 'CPQCartController'],
          topDependencies: ['PricebookEntrySelector', 'DiscountScheduleHelper'],
          riskLevel: 'Low',
          migrationReady: true,
        },
        codeLines: [
          { lineNum: 1, text: 'public static Decimal calculateDiscount(Id productId, Decimal quantity, String tier) {', matchType: 'identical' },
          { lineNum: 2, text: '    Decimal basePrice = PricebookEntrySelector.getActivePrice(productId);', matchType: 'identical' },
          { lineNum: 3, text: '    if (basePrice == null || basePrice <= 0) {', matchType: 'identical' },
          { lineNum: 4, text: '        throw new PricingException(\'Invalid base price for product: \' + productId);', matchType: 'similar' },
          { lineNum: 5, text: '    }', matchType: 'identical' },
          { lineNum: 6, text: '', matchType: 'identical' },
          { lineNum: 7, text: '    Decimal discountPct = 0;', matchType: 'identical' },
          { lineNum: 8, text: '    List<Discount_Schedule__c> schedules = DiscountScheduleHelper.getSchedules(productId, tier);', matchType: 'similar' },
          { lineNum: 9, text: '    for (Discount_Schedule__c sched : schedules) {', matchType: 'identical' },
          { lineNum: 10, text: '        if (quantity >= sched.Min_Quantity__c && quantity <= sched.Max_Quantity__c) {', matchType: 'identical' },
          { lineNum: 11, text: '            discountPct = sched.Discount_Percent__c;', matchType: 'identical' },
          { lineNum: 12, text: '            break;', matchType: 'identical' },
          { lineNum: 13, text: '        }', matchType: 'identical' },
          { lineNum: 14, text: '    }', matchType: 'identical' },
          { lineNum: 15, text: '', matchType: 'identical' },
          { lineNum: 16, text: '    Decimal discountedPrice = basePrice * (1 - discountPct / 100);', matchType: 'identical' },
          { lineNum: 17, text: '    discountedPrice = discountedPrice.setScale(2, RoundingMode.HALF_UP);', matchType: 'similar' },
          { lineNum: 18, text: '', matchType: 'identical' },
          { lineNum: 19, text: '    PricingAuditLogger.log(productId, basePrice, discountPct, discountedPrice);', matchType: 'unique' },
          { lineNum: 20, text: '    return discountedPrice;', matchType: 'identical' },
          { lineNum: 21, text: '}', matchType: 'identical' },
        ],
      },
      {
        id: 'cm-001b',
        name: 'QuotePricingHelper.applyVolumeDiscount()',
        surface: 'Apex',
        owner: 'Sales Operations',
        lastModified: '2025-11-08',
        usageState: 'Active – Secondary',
        loc: 20,
        similarity: 91,
        badge: 'Candidate',
        invocations30d: 6340,
        invocations90d: 19200,
        activePaths: 3,
        lastObserved: '2026-03-25T18:22:00Z',
        runtimeConfidence: 'High',
        dependencies: {
          inboundCount: 4,
          outboundCount: 3,
          topCallers: ['QuoteController', 'RenewalQuoteBuilder', 'AmendmentService'],
          topDependencies: ['PricebookEntrySelector', 'DiscountTierConfig', 'QuoteAuditService'],
          riskLevel: 'Moderate',
          migrationReady: false,
        },
        codeLines: [
          { lineNum: 1, text: 'public static Decimal applyVolumeDiscount(Id prodId, Decimal qty, String tierLevel) {', matchType: 'similar' },
          { lineNum: 2, text: '    Decimal unitPrice = PricebookEntrySelector.getActivePrice(prodId);', matchType: 'identical' },
          { lineNum: 3, text: '    if (unitPrice == null) {', matchType: 'similar' },
          { lineNum: 4, text: '        return null;', matchType: 'different' },
          { lineNum: 5, text: '    }', matchType: 'identical' },
          { lineNum: 6, text: '', matchType: 'identical' },
          { lineNum: 7, text: '    Decimal discount = 0;', matchType: 'identical' },
          { lineNum: 8, text: '    for (Discount_Tier__c dt : DiscountTierConfig.getTiers(prodId, tierLevel)) {', matchType: 'similar' },
          { lineNum: 9, text: '        if (qty >= dt.Lower_Bound__c && qty <= dt.Upper_Bound__c) {', matchType: 'similar' },
          { lineNum: 10, text: '            discount = dt.Rate__c;', matchType: 'similar' },
          { lineNum: 11, text: '            break;', matchType: 'identical' },
          { lineNum: 12, text: '        }', matchType: 'identical' },
          { lineNum: 13, text: '    }', matchType: 'identical' },
          { lineNum: 14, text: '', matchType: 'identical' },
          { lineNum: 15, text: '    Decimal finalPrice = unitPrice - (unitPrice * discount / 100);', matchType: 'similar' },
          { lineNum: 16, text: '    return finalPrice.setScale(2);', matchType: 'similar' },
          { lineNum: 17, text: '}', matchType: 'identical' },
        ],
      },
      {
        id: 'cm-001c',
        name: 'LegacyPricingUtils.calcProductDiscount()',
        surface: 'Apex',
        owner: 'Commerce Engineering',
        lastModified: '2024-08-22',
        usageState: 'Legacy – Low Traffic',
        loc: 19,
        similarity: 87,
        badge: 'Legacy',
        invocations30d: 340,
        invocations90d: 1020,
        activePaths: 1,
        lastObserved: '2026-03-20T09:14:00Z',
        runtimeConfidence: 'Medium',
        dependencies: {
          inboundCount: 2,
          outboundCount: 3,
          topCallers: ['B2BOrderTrigger', 'LegacyCheckoutController'],
          topDependencies: ['Product2Selector', 'DiscountMatrix__c', 'ErrorLogger'],
          riskLevel: 'Moderate',
          migrationReady: false,
        },
        codeLines: [
          { lineNum: 1, text: 'public static Decimal calcProductDiscount(String productId, Integer qty) {', matchType: 'similar' },
          { lineNum: 2, text: '    Product2 prod = Product2Selector.getById(productId);', matchType: 'different' },
          { lineNum: 3, text: '    Decimal price = prod.UnitPrice__c;', matchType: 'different' },
          { lineNum: 4, text: '    if (price == null) { return 0; }', matchType: 'different' },
          { lineNum: 5, text: '', matchType: 'identical' },
          { lineNum: 6, text: '    Decimal discRate = 0;', matchType: 'identical' },
          { lineNum: 7, text: '    List<Discount_Matrix__c> matrix = [', matchType: 'different' },
          { lineNum: 8, text: '        SELECT Rate__c FROM Discount_Matrix__c', matchType: 'different' },
          { lineNum: 9, text: '        WHERE Product__c = :productId AND Min_Qty__c <= :qty', matchType: 'different' },
          { lineNum: 10, text: '        ORDER BY Min_Qty__c DESC LIMIT 1', matchType: 'different' },
          { lineNum: 11, text: '    ];', matchType: 'different' },
          { lineNum: 12, text: '    if (!matrix.isEmpty()) {', matchType: 'similar' },
          { lineNum: 13, text: '        discRate = matrix[0].Rate__c;', matchType: 'similar' },
          { lineNum: 14, text: '    }', matchType: 'identical' },
          { lineNum: 15, text: '', matchType: 'identical' },
          { lineNum: 16, text: '    return price * (1 - discRate / 100);', matchType: 'similar' },
          { lineNum: 17, text: '}', matchType: 'identical' },
        ],
      },
      {
        id: 'cm-001d',
        name: 'PartnerPricingService.getPartnerDiscount()',
        surface: 'Apex',
        owner: 'Partner Integrations',
        lastModified: '2025-09-14',
        usageState: 'Active – Moderate',
        loc: 18,
        similarity: 89,
        badge: 'Variant',
        invocations30d: 2150,
        invocations90d: 7800,
        activePaths: 2,
        lastObserved: '2026-03-25T22:01:00Z',
        runtimeConfidence: 'High',
        dependencies: {
          inboundCount: 3,
          outboundCount: 4,
          topCallers: ['PartnerPortalController', 'PartnerQuoteAPI', 'DealRegistrationService'],
          topDependencies: ['PricebookEntrySelector', 'PartnerTierConfig', 'DiscountScheduleHelper', 'PartnerAuditLog'],
          riskLevel: 'Low',
          migrationReady: true,
        },
      },
      {
        id: 'cm-001e',
        name: 'RenewalPricingCalc.computeRenewalDiscount()',
        surface: 'Apex',
        owner: 'Customer Success Engineering',
        lastModified: '2025-12-02',
        usageState: 'Active – Moderate',
        loc: 21,
        similarity: 90,
        badge: 'Variant',
        invocations30d: 3880,
        invocations90d: 11600,
        activePaths: 3,
        lastObserved: '2026-03-26T02:33:00Z',
        runtimeConfidence: 'High',
        dependencies: {
          inboundCount: 5,
          outboundCount: 3,
          topCallers: ['RenewalOpportunityTrigger', 'ContractRenewalBatch', 'CSMDashboardController', 'AutoRenewalScheduler', 'RenewalQuoteBuilder'],
          topDependencies: ['PricebookEntrySelector', 'RenewalDiscountPolicy', 'DiscountScheduleHelper'],
          riskLevel: 'Low',
          migrationReady: true,
        },
      },
    ],
    sharedIntent: 'Calculate product discount based on volume/quantity tiers and return a final adjusted price.',
    commonBlocks: [
      'Base price lookup via PricebookEntrySelector',
      'Null/invalid price guard clause',
      'Iteration over discount schedule/tier records',
      'Quantity range matching (min/max bounds)',
      'Percentage-based discount application',
      'Decimal rounding to 2 places',
    ],
    differences: [
      'Error handling strategy (exception vs. null return vs. zero return)',
      'Discount schedule data source (custom setting vs. SOQL vs. helper class)',
      'Field API names for tier boundaries (Min_Quantity__c vs. Lower_Bound__c vs. Min_Qty__c)',
      'Audit logging presence (only V2 logs to PricingAuditLogger)',
      'Rounding mode specification (explicit HALF_UP vs. default)',
    ],
    whyItMatters: [
      'Five variants of the same pricing logic increases the surface area for pricing bugs.',
      'A discount rule change requires updates in up to 5 places, with risk of inconsistency.',
      'The legacy variant uses inline SOQL, creating a governor limit risk at scale.',
      'Different error handling means callers may get exceptions, nulls, or zeros for the same edge case.',
    ],
    whereItAppears: [
      'CPQ quoting flow (QuoteLineItemTrigger → PricingRulesEngineV2)',
      'Partner portal deal registration (PartnerPortalController → PartnerPricingService)',
      'Renewal automation batch (ContractRenewalBatch → RenewalPricingCalc)',
      'Legacy B2B checkout (B2BOrderTrigger → LegacyPricingUtils)',
      'Sales rep quote builder (QuoteController → QuotePricingHelper)',
    ],
    estimatedReduction: '~340 lines → ~85 lines (75% reduction)',
    rationale: [
      'PricingRulesEngineV2 has the highest invocation volume and broadest caller base.',
      'It is the only variant with audit logging and explicit rounding mode.',
      'Its dependency risk level is Low and it is migration-ready.',
      'Three of the five variants already share the same PricebookEntrySelector dependency.',
    ],
    nextSteps: [
      'Align QuotePricingHelper to call PricingRulesEngineV2 instead of maintaining its own logic.',
      'Migrate LegacyPricingUtils callers to the standard engine and deprecate the class.',
      'Extend PricingRulesEngineV2 with a partner tier parameter to absorb PartnerPricingService.',
      'Validate RenewalPricingCalc edge cases in sandbox before migration.',
      'Add unit tests covering all five caller paths against the consolidated method.',
    ],
  },
  {
    id: 'cl-002',
    name: 'Address Validation Service Family',
    surface: 'Apex + LWC',
    type: 'Pattern Family',
    similarityRange: '81–92%',
    memberCount: 4,
    runtimePriority: 'Medium',
    recommendation: 'Standardize',
    owner: 'Commerce Engineering',
    lastUpdated: '2026-03-24',
    preferredCandidate: 'AddressValidationService.validate()',
    members: [],
    sharedIntent: 'Validate and normalize mailing/shipping addresses against external API or internal rules.',
    commonBlocks: ['Address normalization', 'USPS/external API callout', 'State abbreviation mapping', 'Null field handling'],
    differences: ['API provider (USPS vs SmartyStreets vs internal)', 'Caching strategy', 'Error response format'],
    whyItMatters: ['Inconsistent address formats cause shipping errors and duplicate account creation.'],
    whereItAppears: ['Account creation flow', 'Checkout shipping step', 'Lead conversion', 'Order fulfillment'],
    estimatedReduction: '~280 lines → ~90 lines (68% reduction)',
    rationale: ['AddressValidationService has the most robust error handling and highest test coverage.'],
    nextSteps: ['Consolidate all address validation behind AddressValidationService.', 'Deprecate LWC-embedded validation logic.'],
  },
  {
    id: 'cl-003',
    name: 'Legacy Lead Scoring Utilities',
    surface: 'Apex',
    type: 'Exact Duplicate',
    similarityRange: '98%',
    memberCount: 3,
    runtimePriority: 'Low',
    recommendation: 'Retire Variant',
    owner: 'Marketing Ops',
    lastUpdated: '2026-03-22',
    preferredCandidate: 'LeadScoringEngine.computeScore()',
    members: [],
    sharedIntent: 'Calculate a numeric lead score based on demographic and behavioral data.',
    commonBlocks: ['Field-weight multiplication', 'Score normalization to 0–100', 'Activity history query'],
    differences: ['Weight configuration source (custom metadata vs. hardcoded)', 'Score capping logic'],
    whyItMatters: ['Exact duplicates waste maintenance effort and create confusion about the canonical source.'],
    whereItAppears: ['Lead assignment rules', 'Marketing Cloud sync', 'SDR dashboard'],
    estimatedReduction: '~180 lines → ~60 lines (67% reduction)',
    rationale: ['Two copies are byte-identical; the third differs only in a class comment header.'],
    nextSteps: ['Delete the two duplicate classes.', 'Update references to point to LeadScoringEngine.'],
  },
  {
    id: 'cl-004',
    name: 'Quote Sync REST Wrapper Patterns',
    surface: 'Apex',
    type: 'Near Duplicate',
    similarityRange: '84–89%',
    memberCount: 5,
    runtimePriority: 'High',
    recommendation: 'Review',
    owner: 'Integration Services',
    lastUpdated: '2026-03-25',
    preferredCandidate: 'QuoteSyncRestClient.postQuote()',
    members: [],
    sharedIntent: 'Send quote data to external ERP/billing systems via REST callout.',
    commonBlocks: ['HTTP POST construction', 'OAuth token retrieval', 'JSON serialization', 'Retry logic on 5xx'],
    differences: ['Endpoint configuration', 'Payload field mapping', 'Retry count and backoff strategy'],
    whyItMatters: ['Multiple REST wrappers multiply the blast radius of an API contract change from the ERP vendor.'],
    whereItAppears: ['Quote approval process', 'Order activation trigger', 'Billing sync batch', 'Manual sync button (LWC)', 'Scheduled nightly sync'],
    estimatedReduction: '~420 lines → ~140 lines (67% reduction)',
    rationale: ['All five share 84%+ structure; differences are mostly config-level, not logic-level.'],
    nextSteps: ['Extract a configurable base REST client.', 'Move endpoint and mapping differences into custom metadata.'],
  },
  {
    id: 'cl-005',
    name: 'Renewal Date Normalization Helpers',
    surface: 'Apex',
    type: 'Exact Duplicate',
    similarityRange: '96%',
    memberCount: 4,
    runtimePriority: 'Medium',
    recommendation: 'Consolidate',
    owner: 'Customer Success Engineering',
    lastUpdated: '2026-03-20',
    preferredCandidate: 'RenewalDateUtils.normalizeRenewalDate()',
    members: [],
    sharedIntent: 'Normalize contract renewal dates to the nearest fiscal quarter boundary.',
    commonBlocks: ['Fiscal calendar lookup', 'Date ceiling to quarter end', 'Weekday adjustment'],
    differences: ['Fiscal year start month assumption', 'Handling of mid-quarter renewals'],
    whyItMatters: ['Inconsistent renewal dates between systems cause revenue recognition errors.'],
    whereItAppears: ['Contract renewal batch', 'Opportunity close-date defaulting', 'Renewal forecast report', 'CSM playbook automation'],
    estimatedReduction: '~160 lines → ~50 lines (69% reduction)',
    rationale: ['Four near-identical helpers with only fiscal start month differing, which can be parameterized.'],
    nextSteps: ['Parameterize fiscal start month.', 'Consolidate into RenewalDateUtils.', 'Update all caller references.'],
  },
  {
    id: 'cl-006',
    name: 'Opportunity Territory Assignment Logic',
    surface: 'Apex',
    type: 'Pattern Family',
    similarityRange: '76–88%',
    memberCount: 6,
    runtimePriority: 'Medium',
    recommendation: 'Review',
    owner: 'Sales Engineering',
    lastUpdated: '2026-03-23',
    preferredCandidate: 'TerritoryAssignmentEngine.assign()',
    members: [],
    sharedIntent: 'Assign opportunities to sales territories based on geography, account tier, and product line.',
    commonBlocks: ['Region lookup by postal code', 'Account tier check', 'Territory model query', 'Round-robin fallback'],
    differences: ['Territory model version (Territory2 vs. custom)', 'Product line filter logic', 'Override handling'],
    whyItMatters: ['Six variants of territory logic means reps may see inconsistent assignments across workflows.'],
    whereItAppears: ['Opportunity trigger', 'Lead conversion', 'Account team sync', 'Territory realignment batch', 'Manual reassignment LWC', 'Import wizard post-processing'],
    estimatedReduction: '~510 lines → ~170 lines (67% reduction)',
    rationale: ['Core assignment algorithm is shared; differences are mostly in data source and override handling.'],
    nextSteps: ['Audit all six for business rule differences vs. accidental drift.', 'Design a unified engine with configurable override strategies.'],
  },
  {
    id: 'cl-007',
    name: 'Invoice Tax Computation Methods',
    surface: 'Apex',
    type: 'Near Duplicate',
    similarityRange: '83–91%',
    memberCount: 4,
    runtimePriority: 'Low',
    recommendation: 'Monitor',
    owner: 'Billing Platform',
    lastUpdated: '2026-03-19',
    preferredCandidate: 'TaxCalculationService.computeTax()',
    members: [],
    sharedIntent: 'Compute tax amounts for invoice line items based on jurisdiction and tax rules.',
    commonBlocks: ['Tax rate lookup by jurisdiction', 'Exemption check', 'Multi-line aggregation', 'Rounding to 2 decimals'],
    differences: ['Tax engine provider (Avalara vs. internal)', 'Exemption certificate handling', 'Multi-currency support'],
    whyItMatters: ['Tax computation errors have direct compliance and audit risk.'],
    whereItAppears: ['Invoice generation batch', 'Quote tax preview', 'Credit memo creation', 'Self-service portal'],
    estimatedReduction: '~300 lines → ~110 lines (63% reduction)',
    rationale: ['Variants are intentionally separated by tax engine; monitor until vendor consolidation is decided.'],
    nextSteps: ['No immediate action. Revisit after Q2 tax vendor contract review.', 'Document differences for audit team.'],
  },
  {
    id: 'cl-008',
    name: 'Case Escalation Trigger Branches',
    surface: 'Trigger',
    type: 'Pattern Family',
    similarityRange: '74–86%',
    memberCount: 5,
    runtimePriority: 'Low',
    recommendation: 'Review',
    owner: 'Service Cloud Team',
    lastUpdated: '2026-03-21',
    preferredCandidate: 'CaseEscalationHandler.evaluateEscalation()',
    members: [],
    sharedIntent: 'Evaluate case priority, SLA proximity, and customer tier to determine escalation actions.',
    commonBlocks: ['Priority threshold check', 'SLA time remaining calculation', 'Customer tier lookup', 'Escalation record creation'],
    differences: ['Escalation channels (email vs Chatter vs Slack)', 'SLA calculation method', 'Manager lookup strategy'],
    whyItMatters: ['Missed escalations directly impact customer satisfaction and SLA compliance metrics.'],
    whereItAppears: ['Case before-update trigger', 'Scheduled SLA check batch', 'Omni-Channel overflow handler', 'Email-to-Case post-processing', 'Chat transcript close trigger'],
    estimatedReduction: '~380 lines → ~130 lines (66% reduction)',
    rationale: ['Trigger-based branches make testing difficult; a handler-based approach would improve testability.'],
    nextSteps: ['Extract escalation evaluation into a single handler class.', 'Replace trigger-embedded logic with handler calls.'],
  },
  {
    id: 'cl-009',
    name: 'Sales Forecast Rollup Utilities',
    surface: 'Apex',
    type: 'Exact Duplicate',
    similarityRange: '97%',
    memberCount: 3,
    runtimePriority: 'Medium',
    recommendation: 'Consolidate',
    owner: 'Revenue Operations',
    lastUpdated: '2026-03-18',
    preferredCandidate: 'ForecastRollupService.rollupByTerritory()',
    members: [],
    sharedIntent: 'Aggregate opportunity amounts by territory, quarter, and forecast category for rollup reporting.',
    commonBlocks: ['Opportunity query with date filters', 'Group-by territory aggregation', 'Forecast category mapping', 'Rollup record upsert'],
    differences: ['Date range defaults', 'Category label mapping'],
    whyItMatters: ['Three copies of rollup logic means forecast discrepancies when one is updated without the others.'],
    whereItAppears: ['Weekly forecast batch', 'Manager dashboard component', 'Executive forecast report'],
    estimatedReduction: '~210 lines → ~75 lines (64% reduction)',
    rationale: ['97% similarity — differences are limited to date default parameters.'],
    nextSteps: ['Consolidate into ForecastRollupService with configurable date range.', 'Delete ForecastRollupHelper and ForecastUtils.'],
  },
  {
    id: 'cl-010',
    name: 'Discount Approval Threshold Evaluators',
    surface: 'Apex',
    type: 'Near Duplicate',
    similarityRange: '88–93%',
    memberCount: 4,
    runtimePriority: 'High',
    recommendation: 'Standardize',
    owner: 'Deal Desk',
    lastUpdated: '2026-03-25',
    preferredCandidate: 'ApprovalThresholdEngine.evaluate()',
    members: [],
    sharedIntent: 'Determine whether a discount percentage requires managerial approval based on configurable thresholds.',
    commonBlocks: ['Threshold lookup by product family', 'Role hierarchy check', 'Approval process submission', 'Notification dispatch'],
    differences: ['Threshold data source (custom setting vs. metadata vs. hardcoded)', 'Approval process name', 'Notification template'],
    whyItMatters: ['Inconsistent approval thresholds mean some deals bypass required approvals, creating revenue leakage risk.'],
    whereItAppears: ['Quote discount field update', 'CPQ guided selling', 'Partner deal registration', 'Renewal pricing override'],
    estimatedReduction: '~260 lines → ~80 lines (69% reduction)',
    rationale: ['ApprovalThresholdEngine uses custom metadata, making it the most configurable and maintainable variant.'],
    nextSteps: ['Migrate all threshold lookups to custom metadata.', 'Route all approval evaluations through ApprovalThresholdEngine.', 'Retire hardcoded threshold constants.'],
  },
];

/* ─── Score History ─── */

export const scoreHistory = [
  { month: 'Jan', score: 62 },
  { month: 'Feb', score: 65 },
  { month: 'Mar 12', score: 69 },
  { month: 'Mar 26', score: 78 },
];

/* ─── Surface Distribution ─── */

export const surfaceDistribution = [
  { name: 'Apex', value: 34 },
  { name: 'Triggers', value: 8 },
  { name: 'LWC JS/TS', value: 6 },
  { name: 'SOQL Patterns', value: 5 },
];

/* ─── Cluster Type Distribution ─── */

export const clusterTypeDistribution = [
  { name: 'Exact Duplicate', value: 8, color: '#ea001e' },
  { name: 'Near Duplicate', value: 14, color: '#fe9339' },
  { name: 'Pattern Family', value: 11, color: '#0176d3' },
];

/* ─── Apex Guru Insights ─── */

export const apexGuruInsights = [
  {
    id: 'ag-001',
    title: 'CPU hotspot in OpportunityTriggerHandler',
    severity: 'Critical',
    impact: 'High',
    team: 'Sales Engineering',
    description: 'The beforeUpdate method in OpportunityTriggerHandler contains nested loops over territory assignments that consume excessive CPU time on bulk updates (200+ records). Refactoring to a map-based lookup could reduce CPU time by ~60%.',
    lastDetected: '2026-03-25',
  },
  {
    id: 'ag-002',
    title: 'Heap allocation spike in AccountMergeService',
    severity: 'Warning',
    impact: 'Medium',
    team: 'Data Quality',
    description: 'AccountMergeService.mergeAccounts() loads all related contacts and opportunities into memory before processing. For accounts with 1,000+ children, this approaches the 6MB synchronous heap limit. Implementing chunked processing would mitigate the risk.',
    lastDetected: '2026-03-24',
  },
  {
    id: 'ag-003',
    title: 'SOQL in loop in QuotePricingHelper',
    severity: 'Critical',
    impact: 'High',
    team: 'Sales Operations',
    description: 'QuotePricingHelper.applyVolumeDiscount() issues a SOQL query inside a for-loop when processing multi-line quotes. This is a known governor limit risk that has caused failures on quotes with 80+ line items.',
    lastDetected: '2026-03-23',
  },
  {
    id: 'ag-004',
    title: 'DML optimization in CaseEscalationBatch',
    severity: 'Info',
    impact: 'Low',
    team: 'Service Cloud Team',
    description: 'CaseEscalationBatch performs individual DML updates inside the execute method loop. Collecting records and performing a single bulk DML at the end of each batch chunk would improve throughput and reduce transaction overhead.',
    lastDetected: '2026-03-22',
  },
];

/* ─── Modernisation Candidates ─── */

export const modernisationCandidates = [
  {
    id: 'mod-001',
    title: 'Migrate LegacyPricingUtils to PricingRulesEngineV2',
    category: 'Code Consolidation',
    impact: 'High',
    team: 'Revenue Cloud Platform',
    status: 'Recommended',
  },
  {
    id: 'mod-002',
    title: 'Replace inline SOQL in QuotePricingHelper with selector pattern',
    category: 'Governor Limit Risk',
    impact: 'High',
    team: 'Sales Operations',
    status: 'Recommended',
  },
  {
    id: 'mod-003',
    title: 'Consolidate ForecastRollupHelper + ForecastUtils into ForecastRollupService',
    category: 'Code Consolidation',
    impact: 'Medium',
    team: 'Revenue Operations',
    status: 'Planned',
  },
  {
    id: 'mod-004',
    title: 'Extract CaseEscalation trigger logic into handler class',
    category: 'Architecture',
    impact: 'Medium',
    team: 'Service Cloud Team',
    status: 'Under Review',
  },
  {
    id: 'mod-005',
    title: 'Unify address validation behind AddressValidationService',
    category: 'Code Consolidation',
    impact: 'Medium',
    team: 'Commerce Engineering',
    status: 'Recommended',
  },
  {
    id: 'mod-006',
    title: 'Migrate hardcoded approval thresholds to Custom Metadata',
    category: 'Configuration',
    impact: 'High',
    team: 'Deal Desk',
    status: 'Planned',
  },
];

/* ─── Agentforce: Initial Messages ─── */

export const initialAgentMessages: AgentMessage[] = [
  {
    id: 'agent-welcome-001',
    role: 'bot',
    content:
      "Hi, I'm Agentforce! I can help you analyze code patterns, identify reuse opportunities, and guide you toward better code standards. What can I help you with?",
    timestamp: new Date().toISOString(),
    actions: [
      { label: 'Run a Code Reuse scan', type: 'scan' },
      { label: 'Show me reuse opportunities', type: 'navigate' },
      { label: "What's changed since my last report?", type: 'query' },
    ],
  },
];

/* ─── Agentforce: Conversation Flows ─── */

export const agentConversations: Record<string, AgentMessage[]> = {
  'scan-summary': [
    {
      id: 'scan-s-001',
      role: 'user',
      content: 'Run a Code Reuse scan',
      timestamp: '2026-03-26T07:00:00Z',
    },
    {
      id: 'scan-s-002',
      role: 'bot',
      content:
        "I've completed the scan of your Northstar Retail Group production org. Here's a summary:\n\n• **Reuse Score:** 78 / 100 (+9 from last scan)\n• **Clusters Found:** 33 across Apex, Triggers, and LWC\n• **High Priority:** 3 clusters need immediate attention\n• **Estimated Savings:** ~1,200 lines of code could be eliminated\n\nThe biggest improvement came from consolidating two Lead Scoring duplicates since your last report. The Pricing Rules Calculator cluster remains the top priority — 5 variants performing the same discount logic.",
      timestamp: '2026-03-26T07:00:05Z',
      actions: [
        { label: 'Show high-priority clusters', type: 'navigate' },
        { label: 'Compare with last report', type: 'query' },
      ],
    },
  ],
  'cluster-analysis': [
    {
      id: 'cl-a-001',
      role: 'user',
      content: 'Analyze the Pricing Rules cluster for me',
      timestamp: '2026-03-26T07:01:00Z',
    },
    {
      id: 'cl-a-002',
      role: 'bot',
      content:
        "Here's my analysis of the **Pricing Rules Calculator Variants** cluster:\n\n**What's happening:** Five Apex methods across four teams calculate product discounts using nearly identical logic — lookup base price, match quantity to a discount tier, and apply a percentage reduction.\n\n**Why it matters:**\n• A single pricing rule change requires updates in up to 5 places\n• The legacy variant (LegacyPricingUtils) uses inline SOQL, creating governor limit risk\n• Different error handling means callers may get exceptions, nulls, or zeros for the same edge case\n\n**Recommendation:** Standardize on `PricingRulesEngineV2.calculateDiscount()` — it has the highest invocation volume (14,820/month), audit logging, and explicit rounding. Its dependency risk is Low and it's migration-ready.\n\n**Estimated reduction:** ~340 lines → ~85 lines (75%)",
      timestamp: '2026-03-26T07:01:08Z',
      actions: [
        { label: 'Show me the code diff', type: 'navigate' },
        { label: 'Create migration tasks', type: 'action' },
        { label: 'Who owns these variants?', type: 'query' },
      ],
    },
    {
      id: 'cl-a-003',
      role: 'user',
      content: 'Who owns these variants?',
      timestamp: '2026-03-26T07:02:00Z',
    },
    {
      id: 'cl-a-004',
      role: 'bot',
      content:
        "Here's the ownership breakdown:\n\n1. **PricingRulesEngineV2** — Revenue Cloud Platform (Priya Raman)\n2. **QuotePricingHelper** — Sales Operations (Marcus Chen)\n3. **LegacyPricingUtils** — Commerce Engineering (Sarah Kim) — last modified Aug 2024\n4. **PartnerPricingService** — Partner Integrations (Raj Patel)\n5. **RenewalPricingCalc** — Customer Success Engineering (Lisa Wong)\n\nI'd suggest starting the conversation with Marcus Chen (Sales Ops), since QuotePricingHelper is the second-most active variant and shares the most dependencies with the preferred candidate. Sarah Kim's legacy variant has the lowest traffic and could be retired with minimal coordination.",
      timestamp: '2026-03-26T07:02:06Z',
      actions: [
        { label: 'Draft a migration plan', type: 'action' },
        { label: 'Schedule a review meeting', type: 'action' },
      ],
    },
  ],
  'report-comparison': [
    {
      id: 'rpt-c-001',
      role: 'user',
      content: "What's changed since my last report?",
      timestamp: '2026-03-26T07:03:00Z',
    },
    {
      id: 'rpt-c-002',
      role: 'bot',
      content:
        "Comparing your **Mar 26** report (score: 78) to the **Mar 12** report (score: 69):\n\n**Score improved by +9 points.** Here's what changed:\n\n✅ **Resolved (2 clusters):**\n• Lead Scoring duplicate classes were deleted — saved ~120 lines\n• ForecastUtils was consolidated into ForecastRollupService\n\n📈 **Improved (3 clusters):**\n• Pricing Rules cluster — PartnerPricingService refactored to share PricebookEntrySelector (+3% similarity)\n• Address Validation — test coverage increased from 68% to 91%\n• Discount Approval — one hardcoded threshold migrated to Custom Metadata\n\n⚠️ **New (1 cluster):**\n• A new near-duplicate was detected in the Renewal Date helpers — appears to be from the Q2 contract automation sprint\n\n**Net:** 33 clusters (was 34), 3 high-priority (unchanged).",
      timestamp: '2026-03-26T07:03:10Z',
      actions: [
        { label: 'Show resolved clusters', type: 'navigate' },
        { label: 'Drill into the new cluster', type: 'navigate' },
        { label: 'Export comparison report', type: 'action' },
      ],
    },
  ],
};
