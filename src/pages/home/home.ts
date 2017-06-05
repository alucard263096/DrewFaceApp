import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IndexbannerDao } from "../../providers/indexbanner.dao";
import { PaintingtypeDao } from "../../providers/paintingtype.dao";
import { PaintingDao } from "../../providers/painting.dao";
import { ApiConfig } from "../../app/api.config";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    indexbanners = [];
    paintingtype = [];
    buycountPainting = [];
    upPainting = [];
    pet = "kittens";
    uploadpath = ApiConfig.getUploadPath();

    constructor(public navCtrl: NavController, public indexBannerDao: IndexbannerDao, public paintingtypeDao: PaintingtypeDao, public paintingDao: PaintingDao) {

  }

  ionViewDidLoad() {
      var json = {orderby:"seq","status":"A"};
      this.indexBannerDao.list(json).then((data) => {
          this.indexbanners = data;
      });
      this.paintingtypeDao.list(json).then((data) => {
          this.paintingtype = data;
      });
      this.paintingDao.list({ orderby: "buycount desc", "status": "A"}).then((data) => {
          this.buycountPainting = data;
      });
      this.paintingDao.list({ orderby: "up desc", "status": "A" }).then((data) => {
          this.upPainting = data;
      });
  }
  bannerGo(banner) {

  }
}
