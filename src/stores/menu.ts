import { defineStore } from 'pinia'
import type { VueFirestoreQueryData } from 'vuefire'
import fireStoreMappers from '@/mappers/FireStoreMapper'
import type Menu from '@/models/Menu'
import type MenuItem from '@/models/MenuItem'

interface MenuState {
  menus: Array<Menu>,
  menuItems: Array<MenuItem>,
}

const useMenuStore = defineStore({
  id: 'menu',
  state: (): MenuState => {
    return {
      menus: [],
      menuItems: []
    }
  },

  actions: {
    async populateMenuFromDbData(dbResultData: VueFirestoreQueryData<Menu>) {
      const mappedMenus = fireStoreMappers.mapToMenusFromDB(dbResultData)
      this.menus = mappedMenus
    },
    async populateMenuItemsFromDbData(dbResultData: VueFirestoreQueryData<MenuItem>) {
      const mappedMenuItems = fireStoreMappers.mapToMenuItemsFromDB(dbResultData)
      this.menuItems = mappedMenuItems
    },
  },

  getters: {
    getMenuItems: (state: MenuState) => (menu: Menu): Array<MenuItem> => {
      let menuItems = state.menuItems.filter(menuItem => menu.MenuItems.includes(menuItem.Id))
      menuItems.sort((a, b) => !!a.Ordering && !!b.Ordering ? a.Ordering - b.Ordering : 0)

      return menuItems
    },
  }
})

export default useMenuStore