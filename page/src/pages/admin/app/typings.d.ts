
declare namespace API {
  type PaginationResponse={
    code: number;
    msg: string;
    data: PaginationData;
  }

  type PaginationData = {
    content: OrderListItem[];
    total: number;
    pageNumber: number;
    pageSize: number;
  }

  type ResponseData = {
    code: number;
    msg: string;
    data: {
      username: string;
      password: string;
      expireDate: Date;
    };
  }

  type OrderListItem = {
    id: number;
    orderSn: string;
  }

  type OrderList = {
    data?: OrderListItem[];
    total?: number;
    success?: boolean;
  }

  type PageParams = {
    current?: number;
    pageSize?: number;
  };
}
