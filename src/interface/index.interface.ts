export interface AdsData {
  id: string;
  name: string;
  quantity: number;
}
export interface SubCampaignData {
  id: string;
  name: string;
  status: boolean;
  ads: AdsData[];
}

export interface GridColumn {
  dataField: string;
  label: string;
  required: boolean;
  type?: "number" | "default";
}
