export const BUYERS = ["Gap", "Dressmann", "Benetton", "Ci-Salfa", "Varner", "AOB", "Lager"];

export interface ProductionOrder {
  id: string; buyer: string; style: string; color: string; qty: number;
  cut: number; sewing: number; finishing: number; packed: number;
  shipDate: string; status: string; priority: string; cm: number;
}

export const productionOrders: ProductionOrder[] = [
  { id:"PO-2025-001", buyer:"Gap", style:"LS-501-SLIM", color:"Indigo Blue", qty:12500, cut:10200, sewing:8400, finishing:7100, packed:6000, shipDate:"2025-04-15", status:"In Production", priority:"High", cm:4.2 },
  { id:"PO-2025-002", buyer:"Dressmann", style:"HM-SKINNY-009", color:"Stone Wash", qty:18000, cut:18000, sewing:16200, finishing:14800, packed:13500, shipDate:"2025-04-10", status:"Packing", priority:"Critical", cm:3.8 },
  { id:"PO-2025-003", buyer:"Benetton", style:"ZR-FLARE-22", color:"Black Raw", qty:8200, cut:5100, sewing:3800, finishing:2900, packed:0, shipDate:"2025-05-02", status:"Cutting", priority:"Normal", cm:5.1 },
  { id:"PO-2025-004", buyer:"Ci-Salfa", style:"GS-3301-STR", color:"Aged Cobalt", qty:6400, cut:6400, sewing:6400, finishing:6100, packed:5800, shipDate:"2025-04-08", status:"Shipped", priority:"Normal", cm:6.8 },
  { id:"PO-2025-005", buyer:"Varner", style:"WR-BOOTCUT-W", color:"Prairie Dust", qty:9800, cut:7200, sewing:5600, finishing:4200, packed:3100, shipDate:"2025-04-22", status:"In Production", priority:"High", cm:3.9 },
  { id:"PO-2025-006", buyer:"AOB", style:"NX-SLIM-FIT-4", color:"Dark Rinse", qty:11200, cut:0, sewing:0, finishing:0, packed:0, shipDate:"2025-05-18", status:"Planning", priority:"Normal", cm:4.4 },
  { id:"PO-2025-007", buyer:"Lager", style:"PM-BASIC-JN2", color:"Mid Wash", qty:24000, cut:19800, sewing:17400, finishing:15200, packed:14000, shipDate:"2025-04-12", status:"Packing", priority:"Critical", cm:2.9 },
];

export interface CutOrder {
  id: string; po: string; buyer: string; style: string; color: string;
  planned: number; cut: number; balance: number; markerEff: number;
  fabricIssued: number; fabricConsumed: number; wasteKg: number;
  table: string; date: string; status: string;
  sizes: { s: string; q: number; r: number }[];
  layPlans: { id: string; fabric: string; len: number; layers: number; plies: number; cons: number; status: string }[];
}

export const cutOrders: CutOrder[] = [
  { id:"CUT-001", po:"PO-2025-001", buyer:"Gap", style:"LS-501-SLIM", color:"Indigo Blue", planned:12500, cut:10200, balance:2300, markerEff:82.4, fabricIssued:28500, fabricConsumed:26840, wasteKg:38.2, table:"T-3", date:"2025-03-18", status:"in-progress",
    sizes:[{s:"28",q:1250,r:1},{s:"30",q:3125,r:2.5},{s:"32",q:3750,r:3},{s:"34",q:2500,r:2},{s:"36",q:1250,r:1},{s:"38",q:625,r:0.5}],
    layPlans:[{id:"LP-001A",fabric:"12oz Selvedge",len:12.4,layers:80,plies:80,cons:24800,status:"completed"},{id:"LP-001B",fabric:"12oz Selvedge",len:12.4,layers:45,plies:32,cons:0,status:"in-progress"}]},
  { id:"CUT-002", po:"PO-2025-002", buyer:"Dressmann", style:"HM-SKINNY-009", color:"Stone Wash", planned:18000, cut:18000, balance:0, markerEff:85.1, fabricIssued:38200, fabricConsumed:37100, wasteKg:22.4, table:"T-1", date:"2025-03-14", status:"completed",
    sizes:[{s:"26",q:1800,r:1},{s:"28",q:3600,r:2},{s:"30",q:5400,r:3},{s:"32",q:4500,r:2.5},{s:"34",q:2700,r:1.5}],
    layPlans:[{id:"LP-002A",fabric:"10oz Stretch",len:11.2,layers:100,plies:100,cons:38200,status:"completed"}]},
  { id:"CUT-003", po:"PO-2025-003", buyer:"Benetton", style:"ZR-FLARE-22", color:"Black Raw", planned:8200, cut:5100, balance:3100, markerEff:79.8, fabricIssued:12400, fabricConsumed:10900, wasteKg:44.1, table:"T-2", date:"2025-03-20", status:"in-progress",
    sizes:[{s:"XS",q:820,r:1},{s:"S",q:1640,r:2},{s:"M",q:2460,r:3},{s:"L",q:1640,r:2},{s:"XL",q:820,r:1},{s:"XXL",q:820,r:1}],
    layPlans:[{id:"LP-003A",fabric:"11oz Black",len:14.1,layers:60,plies:60,cons:10900,status:"completed"},{id:"LP-003B",fabric:"11oz Black",len:14.1,layers:60,plies:12,cons:0,status:"in-progress"}]},
  { id:"CUT-004", po:"PO-2025-007", buyer:"Lager", style:"PM-BASIC-JN2", color:"Mid Wash", planned:24000, cut:19800, balance:4200, markerEff:83.7, fabricIssued:48200, fabricConsumed:42100, wasteKg:62.8, table:"T-4", date:"2025-03-16", status:"in-progress",
    sizes:[{s:"28",q:2400,r:1},{s:"30",q:4800,r:2},{s:"32",q:7200,r:3},{s:"34",q:4800,r:2},{s:"36",q:3600,r:1.5},{s:"38",q:1200,r:0.5}],
    layPlans:[{id:"LP-004A",fabric:"9oz Mid",len:10.8,layers:120,plies:120,cons:36200,status:"completed"},{id:"LP-004B",fabric:"9oz Mid",len:10.8,layers:80,plies:42,cons:0,status:"in-progress"}]},
];

export interface SewingLine {
  id: string; name: string; po: string; buyer: string; style: string;
  operators: number; target: number; actual: number; eff: number;
  dhu: number; absent: number; ot: number; status: string;
}

export const sewingLines: SewingLine[] = [
  { id:"L-01", name:"Line 01", po:"PO-2025-001", buyer:"Gap", style:"LS-501-SLIM", operators:42, target:680, actual:612, eff:90.0, dhu:2.1, absent:3, ot:2.5, status:"Running" },
  { id:"L-02", name:"Line 02", po:"PO-2025-002", buyer:"Dressmann", style:"HM-SKINNY-009", operators:38, target:720, actual:742, eff:103.1, dhu:1.4, absent:1, ot:0, status:"Running" },
  { id:"L-03", name:"Line 03", po:"PO-2025-007", buyer:"Lager", style:"PM-BASIC-JN2", operators:44, target:780, actual:698, eff:89.5, dhu:3.2, absent:4, ot:3.0, status:"Running" },
  { id:"L-04", name:"Line 04", po:"PO-2025-005", buyer:"Varner", style:"WR-BOOTCUT-W", operators:40, target:640, actual:558, eff:87.2, dhu:4.1, absent:5, ot:1.5, status:"Warning" },
  { id:"L-05", name:"Line 05", po:"PO-2025-003", buyer:"Benetton", style:"ZR-FLARE-22", operators:36, target:520, actual:389, eff:74.8, dhu:6.8, absent:7, ot:4.5, status:"Critical" },
  { id:"L-06", name:"Line 06", po:"—", buyer:"—", style:"Loading...", operators:0, target:0, actual:0, eff:0, dhu:0, absent:0, ot:0, status:"Idle" },
];

export interface WashRecord {
  id: string; style: string; po: string; buyer: string; recipe: string;
  washType: string; temp: number; duration: number; shade: string;
  chemicals: string[]; qty: number; done: number; status: string; laundry: string;
}

export const washData: WashRecord[] = [
  { id:"W-001", style:"LS-501-SLIM", po:"PO-2025-001", buyer:"Gap", recipe:"Classic Stonewash", washType:"Stone Enzyme", temp:50, duration:45, shade:"Medium Indigo", chemicals:["Cellulase","Pumice","Neutralizer","Softener"], qty:7100, done:6400, status:"Running", laundry:"Laundry A" },
  { id:"W-002", style:"HM-SKINNY-009", po:"PO-2025-002", buyer:"Dressmann", recipe:"Light Acid Wash", washType:"Acid", temp:40, duration:30, shade:"Stone", chemicals:["Potassium Permanganate","Sodium Hyposulfite","Neutralizer"], qty:14800, done:14800, status:"Done", laundry:"Laundry B" },
  { id:"W-003", style:"ZR-FLARE-22", po:"PO-2025-003", buyer:"Benetton", recipe:"Black OD Wash", washType:"Overdye", temp:60, duration:55, shade:"Jet Black", chemicals:["Black Reactive Dye","Fixing Agent","Softener"], qty:2900, done:1800, status:"Running", laundry:"Laundry A" },
  { id:"W-004", style:"PM-BASIC-JN2", po:"PO-2025-007", buyer:"Lager", recipe:"Medium Enzyme", washType:"Enzyme", temp:45, duration:40, shade:"Mid Blue", chemicals:["Cellulase","Bio-Polish","Softener"], qty:15200, done:14100, status:"Running", laundry:"Laundry C" },
  { id:"W-005", style:"WR-BOOTCUT-W", po:"PO-2025-005", buyer:"Varner", recipe:"Desert Sand Tint", washType:"Tint", temp:35, duration:25, shade:"Prairie Dust", chemicals:["Yellow Reactive","Brown Reactive","Fixing Agent","Softener"], qty:4200, done:3200, status:"Running", laundry:"Laundry B" },
];

export interface QualityRecord {
  id: string; po: string; buyer: string; style: string; stage: string;
  inspected: number; passed: number; failed: number; dhu: number;
  defects: string[]; result: string; inspector: string; date: string;
}

export const qualityData: QualityRecord[] = [
  { id:"QC-001", po:"PO-2025-001", buyer:"Gap", style:"LS-501-SLIM", stage:"Inline", inspected:1200, passed:1128, failed:72, dhu:6.0, defects:["Stitch skip","Seam puckering","Thread trimming"], result:"Conditional", inspector:"Reza K.", date:"2025-03-19" },
  { id:"QC-002", po:"PO-2025-002", buyer:"Dressmann", style:"HM-SKINNY-009", stage:"Final", inspected:860, passed:851, failed:9, dhu:1.1, defects:["Shade variation"], result:"Pass", inspector:"Sania M.", date:"2025-03-18" },
  { id:"QC-003", po:"PO-2025-003", buyer:"Benetton", style:"ZR-FLARE-22", stage:"Inline", inspected:580, passed:519, failed:61, dhu:10.5, defects:["Open seam","Bartack miss","Zipper defect","Button hole"], result:"Fail", inspector:"Imran A.", date:"2025-03-20" },
  { id:"QC-004", po:"PO-2025-007", buyer:"Lager", style:"PM-BASIC-JN2", stage:"Post-Wash", inspected:2100, passed:2037, failed:63, dhu:3.0, defects:["Wash shade variation","Softener stain"], result:"Conditional", inspector:"Faisal H.", date:"2025-03-19" },
  { id:"QC-005", po:"PO-2025-005", buyer:"Varner", style:"WR-BOOTCUT-W", stage:"AQL", inspected:315, passed:310, failed:5, dhu:1.6, defects:["Broken stitch"], result:"Pass", inspector:"Sania M.", date:"2025-03-17" },
];

export const storeData = {
  fabric: [
    { id:"FAB-001", name:"12oz Selvedge Denim", supplier:"Arvind Mills", rolls:142, yds:38420, allocated:28500, available:9920, shade:"A1-Indigo", location:"R-A1", status:"Good" },
    { id:"FAB-002", name:"10oz Stretch Denim", supplier:"Nandan Denim", rolls:98, yds:24180, allocated:18400, available:5780, shade:"B2-Stone", location:"R-B2", status:"Low" },
    { id:"FAB-003", name:"11oz Black Raw", supplier:"KG Fabriks", rolls:64, yds:16200, allocated:12400, available:3800, shade:"C1-Black", location:"R-C1", status:"Low" },
    { id:"FAB-004", name:"9oz Mid-Weight", supplier:"Shahi Exports", rolls:210, yds:52400, allocated:48200, available:4200, shade:"D1-Mid", location:"R-D1", status:"Critical" },
    { id:"FAB-005", name:"14oz Raw Selvedge", supplier:"Cone Denim", rolls:45, yds:11200, allocated:0, available:11200, shade:"E1-Natural", location:"R-E1", status:"Good" },
  ],
  trims: [
    { id:"TRM-001", name:"YKK Zip 5# Brass", unit:"Pcs", total:45000, used:32400, balance:12600, po:"PO-2025-001/002", status:"Adequate" },
    { id:"TRM-002", name:"Copper Rivet 17mm", unit:"Pcs", total:120000, used:98400, balance:21600, po:"Multi", status:"Low" },
    { id:"TRM-003", name:"Leather Patch A", unit:"Pcs", total:14000, used:10200, balance:3800, po:"PO-2025-001", status:"Low" },
    { id:"TRM-004", name:"Sewing Thread 402", unit:"Cones", total:840, used:620, balance:220, po:"Multi", status:"Adequate" },
    { id:"TRM-005", name:"Hang Tag - Levi's", unit:"Pcs", total:13000, used:6000, balance:7000, po:"PO-2025-001", status:"Good" },
    { id:"TRM-006", name:"Poly Bag 30x40", unit:"Pcs", total:28000, used:14000, balance:14000, po:"Multi", status:"Good" },
  ]
};

export interface Shipment {
  id: string; po: string; buyer: string; style: string; qty: number;
  packed: number; cartons: number; container: string; etd: string; eta: string;
  mode: string; status: string;
  docs: { ci: boolean; pl: boolean; bl: boolean; coo: boolean };
}

export const shipmentData: Shipment[] = [
  { id:"SHP-001", po:"PO-2025-004", buyer:"Ci-Salfa", style:"GS-3301-STR", qty:6400, packed:5800, cartons:242, container:"MSCU8812341", etd:"2025-04-08", eta:"2025-04-28", mode:"Sea-FCL", status:"Loaded", docs:{ ci:true, pl:true, bl:false, coo:true } },
  { id:"SHP-002", po:"PO-2025-002", buyer:"Dressmann", style:"HM-SKINNY-009", qty:18000, packed:13500, cartons:540, container:"CMAU4421089", etd:"2025-04-10", eta:"2025-04-30", mode:"Sea-FCL", status:"In Transit", docs:{ ci:true, pl:true, bl:true, coo:true } },
  { id:"SHP-003", po:"PO-2025-007", buyer:"Lager", style:"PM-BASIC-JN2", qty:24000, packed:14000, cartons:560, container:"—", etd:"2025-04-12", eta:"2025-05-04", mode:"Sea-FCL", status:"Booking", docs:{ ci:false, pl:false, bl:false, coo:false } },
  { id:"SHP-004", po:"PO-2025-001", buyer:"Gap", style:"LS-501-SLIM", qty:12500, packed:6000, cartons:240, container:"—", etd:"2025-04-15", eta:"2025-05-06", mode:"Sea-FCL", status:"Packing", docs:{ ci:false, pl:false, bl:false, coo:false } },
  { id:"SHP-005", po:"PO-2025-005", buyer:"Varner", style:"WR-BOOTCUT-W", qty:9800, packed:3100, cartons:124, container:"—", etd:"2025-04-22", eta:"2025-05-14", mode:"Sea-FCL", status:"Production", docs:{ ci:false, pl:false, bl:false, coo:false } },
];

export const kpiData = {
  efficiency: [{m:"Oct",v:86.2},{m:"Nov",v:88.1},{m:"Dec",v:84.9},{m:"Jan",v:89.4},{m:"Feb",v:91.2},{m:"Mar",v:90.1}],
  dhu: [{m:"Oct",v:4.8},{m:"Nov",v:4.1},{m:"Dec",v:5.2},{m:"Jan",v:3.8},{m:"Feb",v:3.1},{m:"Mar",v:3.4}],
  otDelivery: [{m:"Oct",v:78},{m:"Nov",v:82},{m:"Dec",v:71},{m:"Jan",v:88},{m:"Feb",v:92},{m:"Mar",v:85}],
  fabricUtil: [{m:"Oct",v:88.4},{m:"Nov",v:89.2},{m:"Dec",v:87.6},{m:"Jan",v:90.1},{m:"Feb",v:91.8},{m:"Mar",v:92.3}],
};

export const costData = [
  { cat:"CM (Cut & Make)", budget:4.20, actual:4.48, variance:0.28, status:"Over" },
  { cat:"OT Cost/Unit", budget:0.18, actual:0.31, variance:0.13, status:"Over" },
  { cat:"Fabric Waste %", budget:8.0, actual:9.4, variance:1.4, status:"Over" },
  { cat:"Rework Cost/Unit", budget:0.08, actual:0.11, variance:0.03, status:"Over" },
  { cat:"Finishing Cost", budget:0.45, actual:0.43, variance:-0.02, status:"Under" },
  { cat:"Shipment Cost/PC", budget:0.32, actual:0.29, variance:-0.03, status:"Under" },
];

export const dryProcessData = [
  {id:"DP-001",style:"LS-501-SLIM",po:"PO-2025-001",process:"PP Spray",target:7100,done:6200,operator:"Karim B.",status:"Running"},
  {id:"DP-002",style:"ZR-FLARE-22",po:"PO-2025-003",process:"Hand Sanding",target:2900,done:2100,operator:"Nasir A.",status:"Running"},
  {id:"DP-003",style:"PM-BASIC-JN2",po:"PO-2025-007",process:"Laser Finish",target:15200,done:15200,operator:"Auto",status:"Complete"},
  {id:"DP-004",style:"WR-BOOTCUT-W",po:"PO-2025-005",process:"Whisker",target:4200,done:2800,operator:"Alam R.",status:"Running"},
  {id:"DP-005",style:"HM-SKINNY-009",po:"PO-2025-002",process:"Grinding",target:14800,done:14800,operator:"Machine",status:"Complete"},
];

export const sampleData = [
  {id:"SMP-001",style:"LS-501-SLIM",buyer:"Gap",type:"Proto",attempt:1,sub:"2025-01-10",res:"2025-01-18",status:"Approved"},
  {id:"SMP-002",style:"LS-501-SLIM",buyer:"Gap",type:"Fit",attempt:2,sub:"2025-01-28",res:"2025-02-05",status:"Approved"},
  {id:"SMP-003",style:"LS-501-SLIM",buyer:"Gap",type:"PP",attempt:1,sub:"2025-02-14",res:"2025-02-22",status:"Approved"},
  {id:"SMP-004",style:"HM-SKINNY-009",buyer:"Dressmann",type:"Proto",attempt:1,sub:"2024-12-15",res:"2024-12-22",status:"Approved"},
  {id:"SMP-005",style:"ZR-FLARE-22",buyer:"Benetton",type:"Fit",attempt:2,sub:"2025-02-01",res:"2025-02-12",status:"Rejected"},
  {id:"SMP-006",style:"ZR-FLARE-22",buyer:"Benetton",type:"Fit",attempt:3,sub:"2025-02-20",res:"—",status:"In Progress"},
  {id:"SMP-007",style:"PM-BASIC-JN2",buyer:"Lager",type:"TOP",attempt:1,sub:"2025-03-01",res:"2025-03-08",status:"Approved"},
];

export const techPackData = [
  {style:"LS-501-SLIM",buyer:"Gap",ver:"v3.2",spec:true,bom:true,art:true,upd:"2025-02-15",cmts:0,status:"Approved"},
  {style:"HM-SKINNY-009",buyer:"Dressmann",ver:"v2.1",spec:true,bom:true,art:true,upd:"2025-01-28",cmts:2,status:"Approved"},
  {style:"ZR-FLARE-22",buyer:"Benetton",ver:"v1.4",spec:true,bom:false,art:false,upd:"2025-02-28",cmts:8,status:"Revision Required"},
  {style:"GS-3301-STR",buyer:"Ci-Salfa",ver:"v4.0",spec:true,bom:true,art:true,upd:"2024-12-10",cmts:0,status:"Approved"},
  {style:"WR-BOOTCUT-W",buyer:"Varner",ver:"v2.0",spec:true,bom:true,art:false,upd:"2025-03-01",cmts:3,status:"Pending Review"},
  {style:"PM-BASIC-JN2",buyer:"Lager",ver:"v1.0",spec:true,bom:true,art:true,upd:"2025-02-10",cmts:1,status:"Approved"},
];

export const managementInsights = [
  { icon:"⚠️", title:"OT Cost Overrun (+72%)", desc:"Lines 04 & 05 generating ৳6,300/day extra OT. Root cause: high absent rate (12 workers). Action: Activate standby operators, apply output-based incentive.", urgency:"Critical" },
  { icon:"📉", title:"Line 05 Efficiency at 74.8%", desc:"ZR-FLARE-22 style complexity causing bottleneck at inseam & pocket operation. Action: Re-balance line, add 2 helpers at bottleneck ops.", urgency:"High" },
  { icon:"🔴", title:"Fabric Stock Critical - 9oz Mid", desc:"Only 4,200 yds available vs 8,400 needed for remaining PO-2025-007. Action: Issue urgent PR to Shahi Exports. Expected lead time: 5 days.", urgency:"Critical" },
  { icon:"✅", title:"Dressmann Order On Track", desc:"PO-2025-002 at 75% packed, ETD April 10. All documents ready except B/L. Coordinate with C&F agent for booking confirmation.", urgency:"Normal" },
  { icon:"💰", title:"Rework Cost Savings Opportunity", desc:"Reducing DHU from 3.4% to 3% = ৳42,000/month savings. Focus on Line 05 stitch skip defects through operator retraining.", urgency:"High" },
];

// Helpers
export const pct = (a: number, b: number) => b > 0 ? Math.round((a / b) * 100) : 0;
export const fmt = (n: number | undefined) => n?.toLocaleString() ?? "—";

export const statusColorMap: Record<string, string> = {
  "In Production": "warning", "Packing": "primary", "Shipped": "success",
  "Planning": "info", "Cutting": "info", "Critical": "destructive",
  "Pass": "success", "Fail": "destructive", "Conditional": "warning",
  "Running": "success", "Warning": "warning", "Idle": "muted-foreground",
  "Good": "success", "Low": "warning", "Adequate": "primary",
  "Done": "success", "Complete": "success", "Loaded": "success", "In Transit": "primary",
  "Booking": "info", "Production": "warning",
  "completed": "success", "in-progress": "primary", "hold": "destructive", "planned": "muted-foreground",
  "High": "warning", "Normal": "muted-foreground",
  "Approved": "success", "Rejected": "destructive", "In Progress": "primary",
  "Revision Required": "warning", "Pending Review": "warning",
  "Over": "destructive", "Under": "success",
};
