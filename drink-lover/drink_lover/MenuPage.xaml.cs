using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace drink_lover
{
    public partial class MenuPage : ContentPage
    {
        public ListView ListView { get { return listView; } }
        public MenuPage()
        {
            InitializeComponent();
            listView.ItemsSource = initListView();
        }

        private List<MenuPageItem> initListView()
        {
            var masterPageItems = new List<MenuPageItem>();

            masterPageItems.Add(new MenuPageItem
            {
                Title = "主頁",
                IconSource = "android.png",
                TargetType = typeof(MainPage)
            });

            masterPageItems.Add(new MenuPageItem
            {
                Title = "雲端訂單",
                IconSource = "drinkBlack.png",
                TargetType = typeof(NewOrder)
            });

            masterPageItems.Add(new MenuPageItem
            {
                Title = "關於我們",
                IconSource = "drinkBlack.png",
                TargetType = typeof(NewOrder)
            });

            return masterPageItems;
        }
    }
}
