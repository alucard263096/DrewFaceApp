import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { AbstractDao } from "./dao.abstract";
import { Http } from '@angular/http';
import { PainterApi } from "./painter.api";

@Injectable()
export class PainterDao extends AbstractDao {

    constructor(public http: Http, public sqlite: SQLite) {
        super(sqlite, http);
    }

	
				
		public tableName() {
			return "painter";
		}

		public tableColumns(): Array<string> {
        var columns = new Array();
			columns["paintertype"] = "int";//类型
			columns["paintertype_name"] = "varchar";//类型
			columns["name"] = "varchar";//名称
			columns["introduce"] = "varchar";//自我介绍
			columns["photo"] = "varchar";//头像
			columns["status"] = "varchar";//状态
			columns["status_name"] = "varchar";//状态
			return columns;
		}
				
			   
	//获取画家列表，传入对应的搜索条件
	public list(search_condition, showLoadingModel: boolean = true) {
        let api: PainterApi = new PainterApi(this.http);
        return api.list(search_condition, showLoadingModel).then(data => {
            this.batchUpdate(data);
            return data;
        }).catch(e => {
            return this.simpleQuery(search_condition);
        });
    }
	
	
	//获取画家列表，传入对应的搜索条件
    public sync(search_condition = null, showLoadingModel: boolean = true) {
        let api: PainterApi = new PainterApi(this.http);
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


			   
	//获取画家详情, 传入对应的id
    public get(id, showLoadingModel: boolean = true) {
        let api: PainterApi = new PainterApi(this.http);
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