using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;

namespace drink_lover
{
    public partial class RootPage : MasterDetailPage
    {
        public RootPage()
        {
            InitializeComponent();

            var instance = Singleton.getInstnace();
            MasterBehavior = MasterBehavior.Default;

            instance.menuPage.ListView.ItemSelected += onItemSelected;
        }

        void onItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            var item = e.SelectedItem as MenuPageItem;
            var instance = Singleton.getInstnace();
            if (item != null)
            {
                Detail = new NavigationPage((Page)Activator.CreateInstance(item.TargetType));
                instance.menuPage.ListView.SelectedItem = null;
                IsPresented = false;
            }
        }
    }
}
