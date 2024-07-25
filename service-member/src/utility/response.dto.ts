export class responseWithOutData {
  message_code: string;
  status: string;
  code: string;
  message: string;
  is_actived?: boolean;  
}

export class responseWithData {
  message_code: string;
  status: string;
  code: string;
  message: string;
  data?: string;
}
