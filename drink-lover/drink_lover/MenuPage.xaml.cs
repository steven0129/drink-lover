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
                Title = "推薦飲料",
                IconSource = "drink_black_24dp.png",
                TargetType = typeof(RecommandDrink)
            });

            return masterPageItems;
        }
    }
}
