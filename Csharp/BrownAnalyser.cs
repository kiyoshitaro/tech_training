using System;
using System.IO;
using Contract;
using System.Collections.Generic;


using System.Collections;
using System.Linq;
using System.Text;


namespace BrownDataAnalyser
{
    public class BrownAnalyser : IDataAnalyser
    {
        public string Author => "Brown";

        public string Path
        {
            get;
            private set;
        }

        //public bool compare_str(char[] x, char[] y) {
        //    for (int i = 0; i < 10; i++) {
        //        if (x[i] != y[i]) {
        //            return false;
        //        }
        //    }
        //    return true;
        //}
        //public int find(char[] x, List<char[]> y) {
        //    for (int i = 0; i < y.Count; i++) {
        //        if (compare_str(x, y[i])) {
        //            return i;
        //        }
        //    }
        //    return -1;
        //}

        public ulong ConvertStrToNum(string x) {
            char[] a = x.ToCharArray();
            ulong res = 0;
            for (byte i = 0; i < a.Length; i++) {
                res = res * 26 + (ulong)(a[i] - 'a');
            }
            return res;
        }
        public string ConvertNumToStr(ulong a)
        {
            string res = "";
            for (byte i = 0; i < 10; i++) {
                res = (char)(97 + a % 26) + res;
                a = (a - a % 26) / 26;
            }
            return res;
        }


        public IEnumerable<string> GetTopTenStrings(string path)
        {
            string[] Paths = { };
            if (Directory.Exists(this.Path))
            {
                Paths = Directory.GetFiles(this.Path, "*.dat", SearchOption.TopDirectoryOnly);
            }
            else
            {
                Console.WriteLine("{0} is not a valid file or directory.", this.Path);
                return new List<string>();
            }

            Console.WriteLine("Loading");
            List<ulong> Hashcodes = new List<ulong>();

            foreach (string File in Paths)
            {
                Console.WriteLine(File);
                try
                {
                    using (StreamReader Content = new StreamReader(File))
                    {
                        string Line;
                        while ((Line = Content.ReadLine()) != null)
                        {
                            string[] Words = Line.Split(';');
                            for (byte i = 0; i < Words.Length - 1; i++)
                            {
                                string Word = Words[i].ToLower();
                                //int hashcode = word.GetHashCode();
                                ulong Hashcode = ConvertStrToNum(Word);
                                Hashcodes.Add(Hashcode);
                            }
                        }
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine("The file could not be read:");
                    Console.WriteLine(e.Message);
                }
            }


            Console.WriteLine("Sorting");
            Hashcodes.Sort();

            Console.WriteLine("Processing");

            List<string> Results = new List<string>(11) { "", "", "", "", "", "", "", "", "", "", "" };
            List<int> Counts = new List<int>(11) { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 };
            int Count = 1;
            int LastEle = Results.Count - 1;

            for (int i = 0; i < Hashcodes.Count - 1; i++)
            {
                if (Hashcodes[i] == Hashcodes[i + 1])
                {
                    Count += 1;
                    continue;
                }
                else
                {
                    for (int j = LastEle; j >= 0; j--)
                    {
                        if (j == LastEle && Count <= Counts[j])
                        {
                            break;
                        }
                        if (j == 0)
                        {

                            Results.Insert(0, ConvertNumToStr(Hashcodes[i]));
                            Results.RemoveAt(LastEle);

                            Counts.Insert(0, Count);
                            Counts.RemoveAt(LastEle);
                            break;
                        }
                        if (Count > Counts[j] && Count <= Counts[j - 1])
                        {
                            Results.Insert(j, ConvertNumToStr(Hashcodes[i]));
                            Results.RemoveAt(LastEle);

                            Counts.Insert(j, Count);
                            Counts.RemoveAt(LastEle);
                            break;
                        }

                    }
                    Count = 1;
                }
            }   
            Results.RemoveAt(LastEle);
            Console.WriteLine("Completed !");

            return Results;
//kdwohaslew
//vckrygnucj
//bumfyqjcun
//jcvngzrkdv
//dwphatlexp
//fyqjcungyr
//btmfxqjbun
//gzrkdvohzs
//rygnucjqyf
//fmubiqxemt
        }

        public BrownAnalyser(string path)
        {
            this.Path = path;
        }
    }
}
