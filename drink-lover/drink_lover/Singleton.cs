using System;
using System.Collections.Generic;
using System.Text;

namespace drink_lover
{
    public sealed class Singleton
    {
        static Singleton instance = null;
        public MainPage mainPage = null;
        public MenuPage menuPage = null;
        public RecommandDrink recommandDrink = null;
        public RootPage rootPage = null;

        private Singleton()
        {
        }

        public void init()
        {
            mainPage = new MainPage();
            menuPage = new MenuPage();
            recommandDrink = new RecommandDrink();
            rootPage = new RootPage();
        }

        public static Singleton getInstnace()
        {
            if (instance == null)
            {
                instance = new Singleton();
            }

            return instance;
        }
    }
}
