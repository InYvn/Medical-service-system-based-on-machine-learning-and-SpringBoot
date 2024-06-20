import {
  request
} from '../../request/index2'
// pages/diseasePredict/diseasePredict.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagBgColor: '#FFFFFF',
    selectColor: 'rgba(25,137,250,0.5)',
    symptom: [],
    show: false,
    result:'',
    res: {},
    tagMap: {
      '瘙痒': 'itching',
      '皮疹': 'skin_rash',
      '结节性痒疹': 'nodal_skin_eruptions',
      '喷嚏': 'continuous_sneezing',
      '颤抖': 'shivering',
      '寒冷': 'chills',
      '关节痛': 'joint_pain',
      '胃痛': 'stomach_pain',
      '酸中毒': 'acidity',
      '口腔溃疡': 'ulcers_on_tongue',
      '肌肉衰减': 'muscle_wasting',
      '呕吐': 'vomiting',
      '尿痛': 'burning_micturition',
      '尿滴沥': 'spotting_ urination',
      '疲劳': 'fatigue',
      '体重增加': 'weight_gain',
      '焦虑': 'anxiety',
      '手脚冰凉': 'cold_hands_and_feets',
      '情绪波动': 'mood_swings',
      '体重减轻': 'weight_loss',
      '烦躁不安': 'restlessness',
      '嗜睡': 'lethargy',
      '喉咙发痒': 'patches_in_throat',
      '血糖水平异常': 'irregular_sugar_level',
      '咳嗽': 'cough',
      '高烧': 'high_fever',
      '眼窝凹陷': 'sunken_eyes',
      '呼吸困难': 'breathlessness',
      '出汗': 'sweating',
      '脱水': 'dehydration',
      '消化不良': 'indigestion',
      '头痛': 'headache',
      '皮肤发黄': 'yellowish_skin',
      '尿液深黄': 'dark_urine',
      '恶心': 'nausea',
      '食欲不振': 'loss_of_appetite',
      '眼后疼痛': 'pain_behind_the_eyes',
      '背部疼痛': 'back_pain',
      '便秘': 'constipation',
      '腹痛': 'abdominal_pain',
      '腹泻': 'diarrhoea',
      '低热': 'mild_fever',
      '尿黄': 'yellow_urine',
      '眼睛发黄': 'yellowing_of_eyes',
      '急性肝功能衰竭': 'acute_liver_failure',
      '体液超载': 'fluid_overload',
      '胃胀': 'swelling_of_stomach',
      '淋巴结肿大': 'swelled_lymph_nodes',
      '全身不适': 'malaise',
      '视力模糊': 'blurred_and_distorted_vision',
      '痰多': 'phlegm',
      '咽喉发炎': 'throat_irritation',
      '眼红肿': 'redness_of_eyes',
      '鼻窦压': 'sinus_pressure',
      '流鼻涕': 'runny_nose',
      '鼻塞': 'congestion',
      '胸痛': 'chest_pain',
      '四肢无力': 'weakness_in_limbs',
      '心率加快': 'fast_heart_rate',
      '排便痛': 'pain_during_bowel_movements',
      '肛门痛': 'pain_in_anal_region',
      '血便': 'bloody_stool',
      '颈部痛': 'irritation_in_anus',
      '头晕': 'neck_pain',
      '抽筋': 'dizziness',
      '瘀青': 'cramps',
      '肥胖': 'bruising',
      '腿肿': 'obesity',
      '血管扩张': 'swollen_legs',
      '面目浮肿': 'swollen_blood_vessels',
      '甲状腺肿大': 'puffy_face_and_eyes',
      '指甲脆': 'enlarged_thyroid',
      '四肢肿': 'brittle_nails',
      '过度饥饿': 'swollen_extremeties',
      '婚外性接触': 'excessive_hunger',
      '嘴唇干燥刺痛': 'extra_marital_contacts',
      '口齿不清': 'drying_and_tingling_lips',
      '膝盖痛': 'slurred_speech',
      '髋关节痛': 'knee_pain',
      '肌无力': 'hip_joint_pain',
      '颈部僵硬': 'muscle_weakness',
      '关节肿胀': 'stiff_neck',
      '动作僵硬': 'swelling_joints',
      '运动旋转': 'movement_stiffness',
      '动作僵硬': 'spinning_movements',
      '失去平衡': 'loss_of_balance',
      '不稳': 'unsteadiness',
      '身体单侧无力': 'weakness_of_one_body_side',
      '嗅觉丧失': 'loss_of_smell',
      '膀胱不适': 'bladder_discomfort',
      '尿液有异味': 'foul_smell_of urine',
      '尿感持续': 'continuous_feel_of_urine',
      '排气': 'passage_of_gases',
      '内部瘙痒': 'internal_itching',
      '毒颜(伤寒)': 'toxic_look_(typhos)',
      '抑郁': 'depression',
      '易怒': 'irritability',
      '肌肉疼痛': 'muscle_pain',
      '意识障碍': 'altered_sensorium',
      '全身红斑': 'red_spots_over_body',
      '腹痛': 'belly_pain',
      '月经异常': 'abnormal_menstruation',
      '皮肤色素沉着斑': 'dischromic _patches',
      '眼睛流泪': 'watering_from_eyes',
      '食欲增加': 'increased_appetite',
      '多尿': 'polyuria',
      '家族史': 'family_history',
      '粘液性痰': 'mucoid_sputum',
      '锈性痰': 'rusty_sputum',
      '注意力不集中': 'lack_of_concentration',
      '视力障碍': 'visual_disturbances',
      '接受输血': 'receiving_blood_transfusion',
      '接受未经消毒的注射': 'receiving_unsterile_injections',
      '昏迷': 'coma',
      '胃出血': 'stomach_bleeding',
      '腹部膨胀': 'distention_of_abdomen',
      '饮酒史': 'history_of_alcohol_consumption',
      '体液过载': 'fluid_overload',
      '痰中带血': 'blood_in_sputum',
      '小腿静脉曲张': 'prominent_veins_on_calf',
      '心悸': 'palpitations',
      '行走疼痛': 'painful_walking',
      '脓疱': 'pus_filled_pimples',
      '黑头': 'blackheads',
      '皮屑': 'scurring',
      '皮肤脱皮': 'skin_peeling',
      '银白色鳞屑': 'silver_like_dusting',
      '指甲小凹痕': 'small_dents_in_nails',
      '指甲发炎': 'inflammatory_nails',
      '水泡': 'blister',
      '鼻子周围红疮': 'red_sore_around_nose',
      '黄色脓液渗出': 'yellow_crust_ooz'
    },
    hotTag: [{
      id: 1,
      tag: '瘙痒',
      active: false
    }, {
      id: 2,
      tag: '皮疹',
      active: false
    }, {
      id: 3,
      tag: '结节性痒疹',
      active: false
    }, {
      id: 4,
      tag: '喷嚏',
      active: false
    }, {
      id: 5,
      tag: '颤抖',
      active: false
    }, {
      id: 6,
      tag: '寒冷',
      active: false
    }, {
      id: 7,
      tag: '关节痛',
      active: false
    }, {
      id: 8,
      tag: '胃痛',
      active: false
    }, {
      id: 9,
      tag: '酸中毒',
      active: false
    }, {
      id: 10,
      tag: '口腔溃疡',
      active: false
    }, {
      id: 11,
      tag: '肌肉衰减',
      active: false
    }, {
      id: 12,
      tag: '呕吐',
      active: false
    }, {
      id: 13,
      tag: '尿痛',
      active: false
    }, {
      id: 14,
      tag: '尿滴沥',
      active: false
    }, {
      id: 15,
      tag: '疲劳',
      active: false
    }, {
      id: 16,
      tag: '体重增加',
      active: false
    }, {
      id: 17,
      tag: '焦虑',
      active: false
    }, {
      id: 18,
      tag: '手脚冰凉',
      active: false
    }, {
      id: 19,
      tag: '情绪波动',
      active: false
    }, {
      id: 20,
      tag: '体重减轻',
      active: false
    }, {
      id: 21,
      tag: '烦躁不安',
      active: false
    }, {
      id: 22,
      tag: '嗜睡',
      active: false
    }, {
      id: 23,
      tag: '喉咙发痒',
      active: false
    }, {
      id: 24,
      tag: '血糖水平异常',
      active: false
    }, {
      id: 25,
      tag: '咳嗽',
      active: false
    }, {
      id: 26,
      tag: '高烧',
      active: false
    }, {
      id: 27,
      tag: '眼窝凹陷',
      active: false
    }, {
      id: 28,
      tag: '呼吸困难',
      active: false
    }, {
      id: 29,
      tag: '出汗',
      active: false
    }, {
      id: 30,
      tag: '脱水',
      active: false
    }, {
      id: 31,
      tag: '消化不良',
      active: false
    }, {
      id: 32,
      tag: '头痛',
      active: false
    }, {
      id: 33,
      tag: '皮肤发黄',
      active: false
    }, {
      id: 34,
      tag: '尿液深黄',
      active: false
    }, {
      id: 35,
      tag: '恶心',
      active: false
    }, {
      id: 36,
      tag: '食欲不振',
      active: false
    }, {
      id: 37,
      tag: '眼后疼痛',
      active: false
    }, {
      id: 38,
      tag: '背部疼痛',
      active: false
    }, {
      id: 39,
      tag: '便秘',
      active: false
    }, {
      id: 40,
      tag: '腹痛',
      active: false
    }, {
      id: 41,
      tag: '腹泻',
      active: false
    }, {
      id: 42,
      tag: '低热',
      active: false
    }, {
      id: 43,
      tag: '尿黄',
      active: false
    }, {
      id: 44,
      tag: '眼睛发黄',
      active: false
    }, {
      id: 45,
      tag: '急性肝功能衰竭',
      active: false
    }, {
      id: 46,
      tag: '体液超载',
      active: false
    }, {
      id: 47,
      tag: '胃胀',
      active: false
    }, {
      id: 48,
      tag: '淋巴结肿大',
      active: false
    }, {
      id: 49,
      tag: '全身不适',
      active: false
    }, {
      id: 50,
      tag: '视力模糊',
      active: false
    }, {
      id: 51,
      tag: '痰多',
      active: false
    }, {
      id: 52,
      tag: '咽喉发炎',
      active: false
    }, {
      id: 53,
      tag: '眼红肿',
      active: false
    }, {
      id: 54,
      tag: '鼻窦压',
      active: false
    }, {
      id: 55,
      tag: '流鼻涕',
      active: false
    }, {
      id: 56,
      tag: '鼻塞',
      active: false
    }, {
      id: 57,
      tag: '胸痛',
      active: false
    }, {
      id: 58,
      tag: '四肢无力',
      active: false
    }, {
      id: 59,
      tag: '心率加快',
      active: false
    }, {
      id: 60,
      tag: '排便痛',
      active: false
    }, {
      id: 61,
      tag: '肛门痛',
      active: false
    }, {
      id: 62,
      tag: '血便',
      active: false
    }, {
      id: 63,
      tag: '颈部痛',
      active: false
    }, {
      id: 64,
      tag: '头晕',
      active: false
    }, {
      id: 65,
      tag: '抽筋',
      active: false
    }, {
      id: 66,
      tag: '瘀青',
      active: false
    }, {
      id: 67,
      tag: '肥胖',
      active: false
    }, {
      id: 68,
      tag: '腿肿',
      active: false
    }, {
      id: 69,
      tag: '血管扩张',
      active: false
    }, {
      id: 70,
      tag: '面目浮肿',
      active: false
    }, {
      id: 71,
      tag: '甲状腺肿大',
      active: false
    }, {
      id: 72,
      tag: '指甲脆',
      active: false
    }, {
      id: 73,
      tag: '四肢肿',
      active: false
    }, {
      id: 74,
      tag: '过度饥饿',
      active: false
    }, {
      id: 75,
      tag: '婚外性接触',
      active: false
    }, {
      id: 76,
      tag: '嘴唇干燥刺痛',
      active: false
    }, {
      id: 77,
      tag: '口齿不清',
      active: false
    }, {
      id: 78,
      tag: '膝盖痛',
      active: false
    }, {
      id: 79,
      tag: '髋关节痛',
      active: false
    }, {
      id: 80,
      tag: '肌无力',
      active: false
    }, {
      id: 81,
      tag: '颈部僵硬',
      active: false
    }, {
      id: 82,
      tag: '关节肿胀',
      active: false
    }, {
      id: 83,
      tag: '动作僵硬',
      active: false
    }, {
      id: 84,
      tag: '运动旋转',
      active: false
    }, {
      id: 85,
      tag: '动作僵硬',
      active: false
    }, {
      id: 86,
      tag: '失去平衡',
      active: false
    }, {
      id: 87,
      tag: '不稳',
      active: false
    }, {
      id: 88,
      tag: '身体单侧无力',
      active: false
    }, {
      id: 89,
      tag: '嗅觉丧失',
      active: false
    }, {
      id: 90,
      tag: '膀胱不适',
      active: false
    }, {
      id: 91,
      tag: '尿液有异味',
      active: false
    }, {
      id: 92,
      tag: '尿感持续',
      active: false
    }, {
      id: 93,
      tag: '排气',
      active: false
    }, {
      id: 94,
      tag: '内部瘙痒',
      active: false
    }, {
      id: 95,
      tag: '毒颜(伤寒)',
      active: false
    }, {
      id: 96,
      tag: '抑郁',
      active: false
    }, {
      id: 97,
      tag: '易怒',
      active: false
    }, {
      id: 98,
      tag: '肌肉疼痛',
      active: false
    }, {
      id: 99,
      tag: '意识障碍',
      active: false
    }, {
      id: 100,
      tag: '全身红斑',
      active: false
    }, {
      id: 101,
      tag: '腹痛',
      active: false
    }, {
      id: 102,
      tag: '月经异常',
      active: false
    }, {
      id: 103,
      tag: '皮肤色素沉着斑',
      active: false
    }, {
      id: 104,
      tag: '眼睛流泪',
      active: false
    }, {
      id: 105,
      tag: '食欲增加',
      active: false
    }, {
      id: 106,
      tag: '多尿',
      active: false
    }, {
      id: 107,
      tag: '家族史',
      active: false
    }, {
      id: 108,
      tag: '粘液性痰',
      active: false
    }, {
      id: 109,
      tag: '锈性痰',
      active: false
    }, {
      id: 110,
      tag: '注意力不集中',
      active: false
    }, {
      id: 111,
      tag: '视力障碍',
      active: false
    }, {
      id: 112,
      tag: '接受输血',
      active: false
    }, {
      id: 113,
      tag: '接受未经消毒的注射',
      active: false
    }, {
      id: 114,
      tag: '昏迷',
      active: false
    }, {
      id: 115,
      tag: '胃出血',
      active: false
    }, {
      id: 116,
      tag: '腹部膨胀',
      active: false
    }, {
      id: 117,
      tag: '饮酒史',
      active: false
    }, {
      id: 118,
      tag: '体液过载',
      active: false
    }, {
      id: 119,
      tag: '痰中带血',
      active: false
    }, {
      id: 120,
      tag: '小腿静脉曲张',
      active: false
    }, {
      id: 121,
      tag: '心悸',
      active: false
    }, {
      id: 122,
      tag: '行走疼痛',
      active: false
    }, {
      id: 123,
      tag: '脓疱',
      active: false
    }, {
      id: 124,
      tag: '黑头',
      active: false
    }, {
      id: 125,
      tag: '皮屑',
      active: false
    }, {
      id: 126,
      tag: '皮肤脱皮',
      active: false
    }, {
      id: 127,
      tag: '银白色鳞屑',
      active: false
    }, {
      id: 128,
      tag: '指甲小凹痕',
      active: false
    }, {
      id: 129,
      tag: '指甲发炎',
      active: false
    }, {
      id: 130,
      tag: '水泡',
      active: false
    }, {
      id: 131,
      tag: '鼻子周围红疮',
      active: false
    }, {
      id: 132,
      tag: '黄色脓液渗出',
      active: false
    }]
  },


  /**
   * 选择标签
   */
  itemSelected: function (e) {
    let index = e.currentTarget.dataset.index;
    let item = this.data.hotTag[index];
    item.active = !item.active;
    if (item.active) {
      // 如果标签被选中，将其添加到symptom数组中
      this.data.symptom.push(this.data.tagMap[item.tag]);
    } else {
      // 如果标签被取消选中，将其从symptom数组中移除
      let tagIndex = this.data.symptom.indexOf(this.data.tagMap[item.tag]);
      if (tagIndex > -1) {
        this.data.symptom.splice(tagIndex, 1);
      }
    }

    this.setData({
      hotTag: this.data.hotTag,
      symptom: this.data.symptom
    });
  },

  predict() {
    console.log(this.data.symptom)
    if (this.data.symptom.length === 0) {
      wx.showToast({
          title: '请选择至少一个症状',
          icon: 'none',
          duration: 2000
      });
      return;
  }
    request({
      url: 'http://localhost:5000/predict?symptom=' + this.data.symptom,
      method: 'GET'
    }).then(res => {
      this.setData({
        res: res.data,
        result:res.data,
        show:true
      })
      console.log(this.data.res)
    })
  },

  onClose(){
    this.data.show=false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})