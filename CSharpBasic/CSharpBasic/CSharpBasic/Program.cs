using System;
using System.Collections.Generic;
using Contract;
using System.IO;

//using AlexDataAnalyser;
using BrownDataAnalyser;
namespace CSharpBasic
{
    class Program
    {
        static void Main(string[] args)
        {
            string path;
            if (args.Length != 1)
            {
                Console.WriteLine("You should specify data folder path in args");
                path = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..\\..\\..\\..\\Data"));
                Console.WriteLine($"Default data folder in {path}");

            }
            else
            {
                path = args[0];
            }

            List<IDataAnalyser> Analysers = new List<IDataAnalyser>();
                //Analysers.Add(new AlexAnalyser(@"C:\ABC"));
                Analysers.Add(new BrownAnalyser(path));

                foreach (IDataAnalyser analyser in Analysers)
                {
                    Console.WriteLine($"Author is { analyser.Author} ");
                    foreach (string str in analyser.GetTopTenStrings(analyser.Path))
                    {
                        Console.WriteLine(str);
                    }
                }
                Console.WriteLine("Press any ken to exit.");
                Console.ReadKey();

        }
    }
}
