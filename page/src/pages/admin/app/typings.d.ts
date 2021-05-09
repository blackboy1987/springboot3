
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
    id?: number;
  };

  type App = {
    id: number;
    type: number;
    appId?: string;
    appSecret?: string;
    appCode?: string;
    appToken?: string;
    appName?: string;
  }
  type Member = {
    id?: number;
    nickName?: string;
    avatarUrl?: string;
    country?: string;
    province?: string;
    city?: string;
    isAuth?: boolean;
    updateDate?: Date;
    createdDate?: Date;
    point?: number;
    level1Count?: number;
    level2Count?: number;
    todayCount?: number;
    allCount?: number;
  }
  type ProductCategory = {
    id?: number;
    name?: string;
  }
  type Product = {
    id?: number;
    productCategoryName?: string;
    name?: string;
  }

  type MoreProgram = {

  }
}
