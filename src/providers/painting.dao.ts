import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { AbstractDao } from "./dao.abstract";
import { Http } from '@angular/http';
import { PaintingApi } from "./painting.api";

@Injectable()
export class PaintingDao extends AbstractDao {

    constructor(public http: Http, public sqlite: SQLite) {
        super(sqlite, http);
    }

	
				
		public tableName() {
			return "painting";
		}

		public tableColumns(): Array<string> {
        var columns = new Array();
			columns["title"] = "varchar";//标题
			columns["butnote"] = "varchar";//购买须知
			columns["paintday"] = "int";//绘画周期
			columns["product_img"] = "varchar";//成品图
			columns["origin_img"] = "varchar";//原图
			columns["price"] = "int";//价格
			columns["discountprice"] = "int";//折扣价
			columns["up"] = "int";//赞
			columns["buycount"] = "int";//购买人数
			columns["painter"] = "int";//画师
			columns["painter_name"] = "varchar";//画师
			columns["status"] = "varchar";//状态
			columns["status_name"] = "varchar";//状态
			return columns;
		}
				
			   
	//获取作画列表，传入对应的搜索条件
	public list(search_condition, showLoadingModel: boolean = true) {
        let api: PaintingApi = new PaintingApi(this.http);
        return api.list(search_condition, showLoadingModel).then(data => {
            this.batchUpdate(data);
            return data;
        }).catch(e => {
            return this.simpleQuery(search_condition);
        });
    }
	
	
	//获取作画列表，传入对应的搜索条件
    public sync(search_condition = null, showLoadingModel: boolean = true) {
        let api: PaintingApi = new PaintingApi(this.http);
        return this.getLastestUpdatedTime().then((updatedate) => {
            if (updatedate == undefined) {
                return this.list(search_condition, showLoadingModel);
            }
            return api.list({ "lastupdatecalltime": updatedate }, showLoadingModel).then(data => {
                alert(JSON.stringify(data));
                return this.batchUpdate(data).then(() => {
                    this.updateLatestUpdatedTime();
                    if (search_condition == null) {
                        return null;
                    }
                    return this.simpleQuery(search_condition);
                });
            }).catch(() => {
                if (search_condition == null) {
                    return null;
                }
                this.simpleQuery(search_condition);
            });
        }).catch(e => {
            if (search_condition == null) {
                return null;
            }
            return this.simpleQuery(search_condition);
        });
    }


			   
	//获取作画详情, 传入对应的id
    public get(id, showLoadingModel: boolean = true) {
        let api: PaintingApi = new PaintingApi(this.http);
        return api.get(id, showLoadingModel).then(data => {
            if (data != null) {
                return null;
            } 
            var lst = Array();
            lst.push(data);
            this.batchUpdate(lst);

            return data;

        }).catch(e => {
            return this.getOne(id);
        });
    }


}