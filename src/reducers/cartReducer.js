import * as ACTIONS from "./../actions/actionConstants";
// eslint-disable-next-line
const initialState = {
  items: [],
  isActive: false,
  isHovered: false,
  showModal: false,
  subTotal: 0
};

// eslint-disable-next-line
const testingState = {
  isActive: false,
  isHovered: false,
  showModal: false,
  subTotal: 0,
  items: [
    {
      category: "gear",
      description: "#price30 #disc5 #give20 #catgear",
      discount: 5,
      discountedPrice: 28.5,
      featured: null,
      give: 20,
      giveValue: 6,
      id: "1753720317183748913_7448826116",
      images: {
        thumbnail: {
          width: 150,
          height: 150,
          url:
            "https://scontent.cdninstagram.com/vp/eb32112f07e555b9d4af0760be67b041/5B64D629/t51.2885-15/s150x150/e35/29740359_1975606449371404_6882032420019765248_n.jpg"
        },
        low_resolution: {
          width: 320,
          height: 320,
          url:
            "https://scontent.cdninstagram.com/vp/61958d53bcc1e9efdbb742b29f1db760/5B549E19/t51.2885-15/s320x320/e35/29740359_1975606449371404_6882032420019765248_n.jpg"
        },
        standard_resolution: {
          width: 640,
          height: 640,
          url:
            "https://scontent.cdninstagram.com/vp/72c8078ba4101729cc4201733a930eeb/5B5D7A54/t51.2885-15/s640x640/sh0.08/e35/29740359_1975606449371404_6882032420019765248_n.jpg"
        }
      },
      price: 30,
      quantity: 1,
      run: null,
      title: null
    },
    {
      category: "poster",
      description: "#disc10 #price80 #give20 #catposter",
      discount: 10,
      discountedPrice: 72,
      featured: null,
      give: 20,
      giveValue: 16,
      id: "1755872848315804123_7448826116",
      images: {
        thumbnail: {
          width: 150,
          height: 150,
          url:
            "https://scontent.cdninstagram.com/vp/1aaaa32f48003f5a0c30054f27cf0995/5B665BF5/t51.2885-15/s150x150/e35/30085827_213203239412711_1191371043978084352_n.jpg"
        },
        low_resolution: {
          width: 320,
          height: 320,
          url:
            "https://scontent.cdninstagram.com/vp/2cac3c01e2b41ae5da5dc9047bedc574/5B57ADB2/t51.2885-15/s320x320/e35/30085827_213203239412711_1191371043978084352_n.jpg"
        },
        standard_resolution: {
          width: 640,
          height: 640,
          url:
            "https://scontent.cdninstagram.com/vp/d5a320df180e24dbd588f8e8bd5edd6a/5B6C80F1/t51.2885-15/s640x640/sh0.08/e35/30085827_213203239412711_1191371043978084352_n.jpg"
        }
      },
      price: 80,
      quantity: 1,
      run: null,
      title: null
    },
    {
      category: "poster",
      description: "#price30 #catposter",
      discount: null,
      discountedPrice: null,
      featured: null,
      give: null,
      giveValue: null,
      id: "1762528566632519092_7448826116",
      images: {
        thumbnail: {
          width: 150,
          height: 150,
          url:
            "https://scontent.cdninstagram.com/vp/0d30dc5cc3d559ee7d36eaeeeb451e2c/5B99A789/t51.2885-15/s150x150/e35/30087554_169814713846905_7527712046381531136_n.jpg"
        },
        low_resolution: {
          width: 320,
          height: 320,
          url:
            "https://scontent.cdninstagram.com/vp/984f4c1f13192894ee5079a362692f81/5B7897CE/t51.2885-15/s320x320/e35/30087554_169814713846905_7527712046381531136_n.jpg"
        },
        standard_resolution: {
          width: 640,
          height: 640,
          url:
            "https://scontent.cdninstagram.com/vp/0a8d0f9472a95b5ea7e75ae3e7fadb1a/5B787F8D/t51.2885-15/s640x640/sh0.08/e35/30087554_169814713846905_7527712046381531136_n.jpg"
        }
      },
      price: "30.00",
      quantity: 1,
      run: null,
      title: null
    },
    {
      category: "poster",
      description: "#catposter",
      discount: null,
      discountedPrice: null,
      featured: null,
      give: null,
      giveValue: null,
      id: "1759845862866820184_7448826116",
      images: {
        thumbnail: {
          width: 150,
          height: 150,
          url:
            "https://scontent.cdninstagram.com/vp/e02d7a6d2aac02b5abcd3ad4ace18edc/5B63DBB8/t51.2885-15/s150x150/e35/30087928_1362049220607191_1756618139182825472_n.jpg"
        },
        low_resolution: {
          width: 320,
          height: 320,
          url:
            "https://scontent.cdninstagram.com/vp/8291718667c270033eb479e8e3acee24/5B592E88/t51.2885-15/s320x320/e35/30087928_1362049220607191_1756618139182825472_n.jpg"
        },
        standard_resolution: {
          width: 640,
          height: 640,
          url:
            "https://scontent.cdninstagram.com/vp/6f1c2680a86a2a8d91774aba42b67864/5B6765C5/t51.2885-15/s640x640/sh0.08/e35/30087928_1362049220607191_1756618139182825472_n.jpg"
        }
      },
      price: null,
      quantity: 1,
      run: null,
      title: null
    }
  ]
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    //Move items to and from cart
    case ACTIONS.ADD_TO_CART: {
      return {
        ...state,
        items: [...state.items, ...action.payload]
      };
    }
    case ACTIONS.REMOVE_FROM_CART: {
      return {
        ...state,
        items: action.payload
      };
    }

    //Handle clicks and hovers
    case ACTIONS.HANDLE_CART_CLICK: {
      return {
        ...state,
        isActive: action.payload
      };
    }

    //Update quant
    case ACTIONS.UPDATE_QUANTITY: {
      return {
        ...state,
        items: action.payload
      };
    }

    //Delete on quant 0?
    case ACTIONS.CONFIRM_DELETE: {
      return {
        ...state,
        items: action.payload
      };
    }

    case ACTIONS.REJECT_DELETE: {
      return {
        ...state,
        items: action.payload
      };
    }

    //MODAL
    case ACTIONS.SHOW_MODAL: {
      return {
        ...state,
        showModal: action.payload
      };
    }

    //Fires on cart actions
    case ACTIONS.UPDATE_SUBTOTAL: {
      return {
        ...state,
        subTotal: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
