(brown) ╭─brown at kiyoshitaro’s Mac mini (2) in ~/code/personal/tech_training/graphrag on master✘✘✘ 24-07-16 - 11:49:37
╰─(brown) ⠠⠵ python -m graphrag.index --init --root .
Matplotlib is building the font cache; this may take a moment.
Initializing project at .
⠋ GraphRAG Indexer %  
(brown) ╭─brown at kiyoshitaro’s Mac mini (2) in ~/code/personal/tech_training/graphrag on master✘✘✘ 24-07-16 - 11:51:05
╰─(brown) ⠠⠵ python -m graphrag.index --root .

🚀 Reading settings from settings.yaml
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/numpy/core/fromnumeric.py:59: FutureWarning:
'DataFrame.swapaxes' is deprecated and will be removed in a future version. Please use 'DataFrame.transpose'
instead.
return bound(\*args, \*\*kwds)
🚀 create_base_text_units
id ... n_tokens
0 c2584f52b014c1f09c2d3be292410c05 ... 300
1 a138e3deb4fae7c785fcc5eaf001ae39 ... 300
2 3d877819901618af3528868782659e8f ... 300
3 ea0ace44b29a845e1197cfb83473aa48 ... 300
4 5aa3f3cdeaf01e864ba43631331cbf40 ... 300
.. ... ... ...
123 72f6bbe12142b8269d2e1076f5e1936c ... 300
124 c95989706e55b3e6d4d67829c2a19c76 ... 300
125 1f7ffd94814f7bff6780acad96519c76 ... 300
126 6ff4a48147babcffec9e893a0241cc30 ... 209
127 94c2433d30e8464317772cf3047b72e3 ... 9

[256 rows x 5 columns]
🚀 create_base_extracted_entities
entity_graph
0 <graphml xmlns="http://graphml.graphdrawing.or...
🚀 create_summarized_entities
entity_graph
0 <graphml xmlns="http://graphml.graphdrawing.or...
🚀 create_base_entity_graph
level clustered_graph
0 0 <graphml xmlns="http://graphml.graphdrawing.or...
1 1 <graphml xmlns="http://graphml.graphdrawing.or...
2 2 <graphml xmlns="http://graphml.graphdrawing.or...
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/numpy/core/fromnumeric.py:59: FutureWarning:
'DataFrame.swapaxes' is deprecated and will be removed in a future version. Please use 'DataFrame.transpose'
instead.
return bound(*args, \*\*kwds)
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/numpy/core/fromnumeric.py:59: FutureWarning:
'DataFrame.swapaxes' is deprecated and will be removed in a future version. Please use 'DataFrame.transpose'
instead.
return bound(*args, \*\*kwds)
🚀 create_final_entities
id ... description_embedding
0 b45241d70f0e43fca764df95b2b81f77 ... [-0.03065057471394539, 0.04258553311228752, 0....
1 4119fd06010c494caa07f439b333f4c5 ... [-0.020468438044190407, 0.00926136039197445, 0...
2 d3835bf3dda84ead99deadbeac5d0d7d ... [0.049982842057943344, 0.007829466834664345, -...
3 077d2820ae1845bcbb1803379a3d1eae ... [0.0010605694260448217, 0.018577557057142258, ...
4 3671ea0dd4e84c1a9b02c5ab2c8f4bac ... [0.016767162829637527, 0.00838900450617075, -0...
.. ... ... ...
170 1c5e296a5ac541c1b5cac4357537c22d ... [0.02916599251329899, -0.014410964213311672, -...
171 5ecf534a9ffe46e0b1c2144110c691c0 ... [0.0370720736682415, 0.02739214338362217, 0.01...
172 4d183e7007624fcd98af96b9d752c16d ... [0.029530299827456474, 0.001560976728796959, 0...
173 718c507cb8ac49e6a35c251ac951b5ca ... [-0.010295634157955647, 0.002138220937922597, ...
174 b45ef27279c043269b23b894461d7d8c ... [-0.008130578324198723, -0.0032885014079511166...

[350 rows x 8 columns]
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/numpy/core/fromnumeric.py:59: FutureWarning:
'DataFrame.swapaxes' is deprecated and will be removed in a future version. Please use 'DataFrame.transpose'
instead.
return bound(\*args, \*\*kwds)
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/datashaper/engine/verbs/convert.py:72:
FutureWarning: errors='ignore' is deprecated and will raise in a future version. Use to_datetime without
passing `errors` and catch exceptions explicitly instead
datetime_column = pd.to_datetime(column, errors="ignore")
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/datashaper/engine/verbs/convert.py:72:
UserWarning: Could not infer format, so each element will be parsed individually, falling back to `dateutil`.
To ensure parsing is consistent and as-expected, please specify a format.
datetime_column = pd.to_datetime(column, errors="ignore")
🚀 create_final_nodes
level title type ... top_level_node_id x y
0 0 "PROJECT GUTENBERG" "ORGANIZATION" ... b45241d70f0e43fca764df95b2b81f77 0 0
1 0 "UNITED STATES" "GEO" ... 4119fd06010c494caa07f439b333f4c5 0 0
2 0 "CHARLES DICKENS" "PERSON" ... d3835bf3dda84ead99deadbeac5d0d7d 0 0
3 0 "ARTHUR RACKHAM" "PERSON" ... 077d2820ae1845bcbb1803379a3d1eae 0 0
4 0 "A CHRISTMAS CAROL" "EVENT" ... 3671ea0dd4e84c1a9b02c5ab2c8f4bac 0 0
... ... ... ... ... ... .. ..
1045 2 "SLICE" "ORGANIZATION" ... 1c5e296a5ac541c1b5cac4357537c22d 0 0
1046 2 "CONTINUATION" "ORGANIZATION" ... 5ecf534a9ffe46e0b1c2144110c691c0 0 0
1047 2 "SERIALIZATION OF DATA TO CELLS" "EVENT" ... 4d183e7007624fcd98af96b9d752c16d 0 0
1048 2 "TL" "ORGANIZATION" ... 718c507cb8ac49e6a35c251ac951b5ca 0 0
1049 2 "PROTOBUF" "ORGANIZATION" ... b45ef27279c043269b23b894461d7d8c 0 0

[1050 rows x 14 columns]
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/numpy/core/fromnumeric.py:59: FutureWarning:
'DataFrame.swapaxes' is deprecated and will be removed in a future version. Please use 'DataFrame.transpose'
instead.
return bound(*args, \*\*kwds)
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/numpy/core/fromnumeric.py:59: FutureWarning:
'DataFrame.swapaxes' is deprecated and will be removed in a future version. Please use 'DataFrame.transpose'
instead.
return bound(*args, \*\*kwds)
🚀 create_final_communities
id ... text_unit_ids
0 0 ... [004f0f69a5fca96aa015b79532812228,0fec66c2f94d...
1 3 ... [0d088d08d2da368ddccbbe087712bf5d,1bdbef9745b9...
2 8 ... [3d877819901618af3528868782659e8f,d676e0577c52...
3 6 ... [2290514f6889e9a1737ca0823ad06a9a,3d8778199016...
4 1 ... [01688e43035be37816444b21f109f5d3,3d8778199016...
5 11 ... [09d57e3977b1f4970a1b404060e4766c,3ea03d2531c2...
6 7 ... [5aa3f3cdeaf01e864ba43631331cbf40,5b052429f544...
7 4 ... [13af40943c1cc7757e1b59c8d8376d7f,33141693c7ba...
8 13 ... [0404cd1717a84209404c8ba9ef33d2d6]
9 5 ... [8fc2dfef09d041b203b401a86daa9e14]
10 14 ... [14035d9d342955cfabbcd05ebea0b053]
11 9 ... [3b5b3da1a15015c0fc6bcf64d1300cfc,db28d7be91f8...
12 15 ... [4fc5f52799525cbe5dcea395cc5f8868]
13 12 ... [cbe7e8c41bfaa7fccc7693c891527dd5, 17eda69500e...
14 2 ... [6c4cfb9fe65d9a7f434a4b6d24cf041d]
15 10 ...  
16 17 ... [004f0f69a5fca96aa015b79532812228,0fec66c2f94d...
17 16 ... [a138e3deb4fae7c785fcc5eaf001ae39,c2584f52b014...
18 27 ... [0d088d08d2da368ddccbbe087712bf5d,1bdbef9745b9...
19 38 ... [3d877819901618af3528868782659e8f,d676e0577c52...
20 35 ... [2290514f6889e9a1737ca0823ad06a9a,3d8778199016...
21 20 ... [01688e43035be37816444b21f109f5d3,3d8778199016...
22 34 ... [3d877819901618af3528868782659e8f,ea0ace44b29a...
23 40 ... [09d57e3977b1f4970a1b404060e4766c,3ea03d2531c2...
24 33 ... [493a073e23743162a07a98f52ee3ca1a,bc2f12d36739...
25 26 ... [0d088d08d2da368ddccbbe087712bf5d,10f3d04535ba...
26 36 ... [5aa3f3cdeaf01e864ba43631331cbf40,5c53a1d9dad7...
27 24 ... [04c98052d4dbc4a7743416680e4aaac4]
28 37 ... [51fc393008c182c888c513da9ec4b077,8aa9d03d881f...
29 22 ... [2e747e71c2bacbd870dc7d0ab8b6a849,316214c02cd9...
30 25 ... [13af40943c1cc7757e1b59c8d8376d7f,3d789db25010...
31 30 ... [13af40943c1cc7757e1b59c8d8376d7f,33141693c7ba...
32 23 ... [030f99a378482a57b7d172b48bc71459,28c022b90f44...
33 39 ... [c9fedff5379f0bc305aa3da844162d06,f41e8d4d408e...
34 21 ... [84d2ba6742a0f27fe65f332dbaa5ee52]
35 29 ... [10f3d04535baab22c211cfbc9913a2ac,49e938a98cfd...
36 28 ... [10f3d04535baab22c211cfbc9913a2ac,167ebbbeb6b5...
37 31 ... [4e37a9bd6a1b56994ffa8929a79a52a3]
38 32 ... [6ba2a56a22cf95f47ed0cebad7431ef9,8934560686ef...
39 41 ... [1d4eff1f3eb533367f0d9944232908bb,62691f739912...
40 42 ...  
41 19 ... [004f0f69a5fca96aa015b79532812228,0fec66c2f94d...
42 18 ...  
43 45 ... [01688e43035be37816444b21f109f5d3,3d8778199016...
44 46 ... [0207081d701de9868201b37cc2dee527,6ba2a56a22cf...
45 43 ... [0d57a1e1fd5d5d68962c49c4975b765e,1dfa45190093...
46 44 ... [01688e43035be37816444b21f109f5d3,58bb2e0c2ef5...

[47 rows x 6 columns]
🚀 join_text_units_to_entity_ids
text_unit_ids ... id
0 004f0f69a5fca96aa015b79532812228 ... 004f0f69a5fca96aa015b79532812228
1 0fec66c2f94ddcd79ba4212cd8422744 ... 0fec66c2f94ddcd79ba4212cd8422744
2 1d7a5e260acb1673a3c829063b4ee7be ... 1d7a5e260acb1673a3c829063b4ee7be
3 48ffad18dbbee51d60f5ac54a80ef58f ... 48ffad18dbbee51d60f5ac54a80ef58f
4 4d3995ad3cf8c7745d3770b095101a96 ... 4d3995ad3cf8c7745d3770b095101a96
.. ... ... ...
251 c95989706e55b3e6d4d67829c2a19c76 ... c95989706e55b3e6d4d67829c2a19c76
252 ebdf376d6b3b608fca6461bc709e5c89 ... ebdf376d6b3b608fca6461bc709e5c89
253 334e64c3d73fac04881e088a01458497 ... 334e64c3d73fac04881e088a01458497
254 1f7ffd94814f7bff6780acad96519c76 ... 1f7ffd94814f7bff6780acad96519c76
255 94c2433d30e8464317772cf3047b72e3 ... 94c2433d30e8464317772cf3047b72e3

[256 rows x 3 columns]
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/numpy/core/fromnumeric.py:59: FutureWarning:
'DataFrame.swapaxes' is deprecated and will be removed in a future version. Please use 'DataFrame.transpose'
instead.
return bound(*args, \*\*kwds)
⠙ GraphRAG Indexer
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/numpy/core/fromnumeric.py:59: FutureWarning:
'DataFrame.swapaxes' is deprecated and will be removed in a future version. Please use 'DataFrame.transpose'
instead.
return bound(*args, \*\*kwds)
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/datashaper/engine/verbs/convert.py:65:
FutureWarning: errors='ignore' is deprecated and will raise in a future version. Use to_numeric without
passing `errors` and catch exceptions explicitly instead
column_numeric = cast(pd.Series, pd.to_numeric(column, errors="ignore"))
🚀 create_final_relationships
source target ... target_degree rank
0 "PROJECT GUTENBERG" "A CHRISTMAS CAROL" ... 4 18
1 "PROJECT GUTENBERG" "SUZANNE SHELL" ... 1 15
2 "PROJECT GUTENBERG" "JANET BLENKINSHIP" ... 1 15
3 "PROJECT GUTENBERG" "ONLINE DISTRIBUTED PROOFREADING TEAM" ... 1 15
4 "PROJECT GUTENBERG" "UNITED STATES" ... 3 17
.. ... ... ... ... ...
405 "DIRECTED ACYCLIC GRAPH" "MERKLE PROOF CELL" ... 1 8
406 "DIRECTED ACYCLIC GRAPH" "MERKLE UPDATE CELL" ... 1 8
407 "DIRECTED ACYCLIC GRAPH" "BUILDER" ... 2 9
408 "DIRECTED ACYCLIC GRAPH" "SLICE" ... 2 9
409 "DIRECTED ACYCLIC GRAPH" "CONTINUATION" ... 2 9

[410 rows x 10 columns]
🚀 join_text_units_to_relationship_ids
id relationship_ids
0 c2584f52b014c1f09c2d3be292410c05 [10983a248cc448c59c94df4d1d0898f0, eeb9c02c0ef...
1 a138e3deb4fae7c785fcc5eaf001ae39 [e2ec7d3cdbeb4dd086ae6eb399332363, 67f10971666...
2 1d7a5e260acb1673a3c829063b4ee7be [3c4062de44d64870a3cc5913d5769244]
3 4d3995ad3cf8c7745d3770b095101a96 [3c4062de44d64870a3cc5913d5769244, 423b72bbd56...
4 6f957c9f4d82ecae090a873f34c7e1d2 [3c4062de44d64870a3cc5913d5769244, d4602d4a27b...
.. ... ...
226 18eeda41b71e4665acdf95ad30fd80be [f1a65d05dd5d456b889217020475ef80, 6191e014f3f...
227 c95989706e55b3e6d4d67829c2a19c76 [28b7457ca5dc4a38a488946a3f8e207e, 8029a14d154...
228 cf5f1d0d4ca7eaaac18f5fbca9b3179c [87fe1462b9064d5692641ab48e826301, a55175ac570...
229 334e64c3d73fac04881e088a01458497 [043d764b2e1b4d1294651ff938df5391, 31f2170fef0...
230 1f7ffd94814f7bff6780acad96519c76 [c0866306dc8c4da2a8a81c0c3a78b657, 3884c37eb13...

[231 rows x 2 columns]
⠏ GraphRAG Indexer
├── Loading Input (InputFileType.text) - 2 files loaded (0 filtered) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00 0:00:00
├── create_base_text_units
├── create_base_extracted_entit
⠙ GraphRAG Indexer
├── Loading Input (InputFileType.text) - 2 files loaded (0 filtered) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00 0:00:00
├── create_base_text_units
├── create_base_extracted_entities
├── create_summarized_entities
├── create_base_entity_graph
🚀 create_final_community_reports
community full_content ... full_content_json id
0 43 # Scrooge's Transformation Journey\n\nThis rep... ... {\n "title": "Scrooge's Transformation Jour... fdf50872-7c1b-4af7-9bb2-12348ad7a6e8
1 44 # The Spirit's Influence on Scrooge: A Christm... ... {\n "title": "The Spirit's Influence on Scr... b8747598-1135-436b-aa73-b493f4decc3a
2 45 # The Transformation of Ebenezer Scrooge: A Ch... ... {\n "title": "The Transformation of Ebeneze... e166a7e8-0ed4-41c1-8221-417573b3df1c
3 46 # Scrooge, The Clerk, and Camden Town: A Tale ... ... {\n "title": "Scrooge, The Clerk, and Camde... 784f9c32-0df8-4c8a-b118-9ac236b29c72
4 16 # The Enduring Legacy of A Christmas Carol\n\n... ... {\n "title": "The Enduring Legacy of A Chri... 1983de22-fd77-413f-8725-6d3bd39e3596
5 17 # Project Gutenberg Ecosystem\n\nThe Project G... ... {\n "title": "Project Gutenberg Ecosystem",... d162ffbc-2e47-4c8f-a564-9b5bac4836e0
6 18 # Gutenberg Literary Archive Foundation and It... ... {\n "title": "Gutenberg Literary Archive Fo... 282a9e3b-67b3-46a8-903b-d92fc419f8c5
7 19 # Project Gutenberg Literary Archive Foundatio... ... {\n "title": "Project Gutenberg Literary Ar... cf5b1f60-a80b-40ac-887d-3caafca8af65
8 21 # Scrooge's Vision: The Path Not Taken\n\nThis... ... {\n "title": "Scrooge's Vision: The Path No... 7a68b126-fa2c-4471-8012-7d9ead86609a
9 22 # Scrooge's Journey Through Christmas-time in ... ... {\n "title": "Scrooge's Journey Through Chr... 17b6f50e-baa2-4139-8251-123c5b875c30
10 23 # Scrooge's Transformation: The Spirit's Influ... ... {\n "title": "Scrooge's Transformation: The... bcb0646f-522b-44ab-98e1-a316ed238f01
11 24 # Scrooge and Marley Partnership\n\nThe commun... ... {\n "title": "Scrooge and Marley Partnershi... 7b2b67c8-959e-412c-ab8b-ebf9d08a5113
12 25 # Scrooge's Counting-House and Its Impact on C... ... {\n "title": "Scrooge's Counting-House and ... 0b1ac129-69c5-46fd-b106-d057730f56f9
13 26 # The Cratchit Family: A Portrait of Unity and... ... {\n "title": "The Cratchit Family: A Portra... 69cac192-5ff0-4980-af4b-bcac850f54a4
14 27 # The Cratchit Family: A Tale of Hope and Resi... ... {\n "title": "The Cratchit Family: A Tale o... 448b6764-3a1c-4497-8279-e43aef47ecdd
15 28 # Christmas Day and the Cratchit Family's Cele... ... {\n "title": "Christmas Day and the Cratchi... dd8f419d-acac-4ea9-a431-2ca55de3ee4b
16 29 # The Cratchit Family: A Tale of Hope and Tran... ... {\n "title": "The Cratchit Family: A Tale o... 9c95d50e-d07e-40d3-b92f-5a698eba1130
17 30 # The Transformative Power of Christmas on Scr... ... {\n "title": "The Transformative Power of C... 2cf9e4cd-2960-4a53-b877-4861bdd291b1
18 31 # Christmas Festivities on The Ship\n\nThis re... ... {\n "title": "Christmas Festivities on The ... af8f8aa1-4f29-4552-be2e-6cb0f86065ab
19 32 # Social Dynamics at Fred's Dinner Party\n\nTh... ... {\n "title": "Social Dynamics at Fred's Din... cf3b66f5-402d-4ba1-b116-2ea5da4abff6
20 33 # The Impact of Scrooge's Financial Practices ... ... {\n "title": "The Impact of Scrooge's Finan... 9b156c03-4ee6-4047-8483-99ae9b7b6d28
21 34 # Scrooge's Network: A Tale of Transformation ... ... {\n "title": "Scrooge's Network: A Tale of ... aedca57f-c745-4ad4-92a0-3d9449aa6218
22 35 # Scrooge's Transformation and Familial Bonds\... ... {\n "title": "Scrooge's Transformation and ... 71d5b3ad-b1ae-445b-ba1e-de31e2bbce68
23 36 # Marley's Ghost and the Ethereal Chain of Con... ... {\n "title": "Marley's Ghost and the Ethere... 08bd9d71-2b8a-4c26-b8a4-9211c9213c44
24 37 # Fezziwig's Christmas Eve Celebration\n\nThis... ... {\n "title": "Fezziwig's Christmas Eve Cele... 89750825-a277-4f6a-bfbd-5a05b73a6371
25 38 # The Fezziwig Festive Community\n\nThe commun... ... {\n "title": "The Fezziwig Festive Communit... 6904cd7d-d891-4799-a69a-2142175b9237
26 39 # The Fezziwig Festive Circle\n\nThe community... ... {\n "title": "The Fezziwig Festive Circle",... 820ed3f2-50ac-4ab4-9621-3eae66ab3f2d
27 40 # The Underworld Economy of Joe's Network\n\nT... ... {\n "title": "The Underworld Economy of Joe... 35551a3c-1c58-460f-b6f8-a302e80f3e6b
28 41 # Old Joe's Network: A Tale of Second-Hand Dea... ... {\n "title": "Old Joe's Network: A Tale of ... c8a6b1e5-dbbb-461a-be22-c867ea7fbf2f
29 42 # The Parlour and Its Inhabitants\n\nThis repo... ... {\n "title": "The Parlour and Its Inhabitan... 879bd96c-e59b-488f-9ef5-85ca0d8e651d
30 20 # The Transformational Journey of Ebenezer Scr... ... {\n "title": "The Transformational Journey ... 9488d25d-8894-4003-b6c2-416e3f638099
31 0 # Project Gutenberg and Its Ecosystem\n\nThis ... ... {\n "title": "Project Gutenberg and Its Eco... d2c03f86-aa28-490b-9cbb-b6551d7f353f
32 10 # The Emotional Dynamics of a Family as Seen b... ... {\n "title": "The Emotional Dynamics of a F... 9d82d2ad-e002-433e-8f06-ea7aa4b96743
33 11 # The Underworld Economy of Posthumous Possess... ... {\n "title": "The Underworld Economy of Pos... 3fee170c-bc40-4757-aa43-cb1b5f505499
34 12 # Lighthouse and The Sea: A Maritime Chronicle... ... {\n "title": "Lighthouse and The Sea: A Mar... 6c036d61-0000-4b0f-99e6-03dd92713e46
35 13 # The Ancient Tower and The Church\n\nThis rep... ... {\n "title": "The Ancient Tower and The Chu... d228869d-ea79-44c9-b044-f666364a0ee3
36 14 # The Spectre and The Star: A Tale of Regret a... ... {\n "title": "The Spectre and The Star: A T... 3d0933c6-71b2-41e8-ab9c-f88a5c9265c0
37 15 # The Young Girl and The Daughter: A Generatio... ... {\n "title": "The Young Girl and The Daught... 9649ee0a-b164-42eb-9eda-16424f50d190
38 2 # The Shopkeeper's Intriguing Encounters\n\nTh... ... {\n "title": "The Shopkeeper's Intriguing E... 2a8cb51c-7038-4c12-aa45-5c646726332b
39 3 # The Cratchit Family: A Study of Resilience a... ... {\n "title": "The Cratchit Family: A Study ... f79d3998-e393-44d8-a3d5-85919dd64292
40 4 # The Spirit of Christmas and Scrooge's Transf... ... {\n "title": "The Spirit of Christmas and S... 0643ac23-0cdd-42ab-acd6-ac9f111138d1
41 5 # The Fireplace and Dutch Merchant: A Cultural... ... {\n "title": "The Fireplace and Dutch Merch... 6eaf5c06-a5fe-404c-a7b5-fe6fb9af0c8b
42 6 # The Transformative Journey of Ebenezer Scroo... ... {\n "title": "The Transformative Journey of... 96a0a5d9-cd13-461d-a139-314a91b188e3
43 7 # Scrooge's Transformation: A Christmas Carol\... ... {\n "title": "Scrooge's Transformation: A C... e85e49aa-48ee-4800-be49-a62a4b3272aa
44 8 # The Fezziwig Festive Community\n\nThe commun... ... {\n "title": "The Fezziwig Festive Communit... 25e5e4fe-879d-4025-a7da-4ac834ced52f
45 9 # The Complex Dynamics of 'The Girl' and 'He'\... ... {\n "title": "The Complex Dynamics of 'The ... 1b490d4d-1cbf-4deb-919c-43cd8a0cafc8
46 1 # The Transformational Journey of Ebenezer Scr... ... {\n "title": "The Transformational Journey ... b1287115-e6ae-42d6-9a1e-b451d033fcba

[47 rows x 10 columns]
🚀 create_final_text_units
id text ... entity_ids relationship_ids
0 c2584f52b014c1f09c2d3be292410c05 The Project Gutenberg eBook of A Christmas Car... ... [b45241d70f0e43fca764df95b2b81f77, 4119fd06010... [10983a248cc448c59c94df4d1d0898f0, eeb9c02c0ef...
1 a138e3deb4fae7c785fcc5eaf001ae39 PROJECT GUTENBERG EBOOK A CHRISTMAS CAROL \*\*\*... ... [b45241d70f0e43fca764df95b2b81f77, d3835bf3dda... [e2ec7d3cdbeb4dd086ae6eb399332363, 67f10971666...
2 3d877819901618af3528868782659e8f 8,\n 1962, 1964, 1966, 1967, 1969, 1971, 1972... ... [de988724cfdf45cebfba3b13c43ceede, 96aad7cb4b7... [a24e9df02e1b4b43bf6324b039e28285, ab3a5a67132...
3 ea0ace44b29a845e1197cfb83473aa48 Mr. Fezziwig, a kind-hearted, jovial old mer... ... [9646481f66ce4fd2b08c2eddda42fc82, d91a266f766... [047cd93e9d704c7d8dadb6e79f9458df, e1f524d4b97...
4 5aa3f3cdeaf01e864ba43631331cbf40 ors.\n Mrs. Cratchit, wife of Bob Cratchit.\n... ... [de988724cfdf45cebfba3b13c43ceede, bf4e255cdac... [1ca41537c47c4752a17a44d1d7086d96, 7e0d14ca308...
.. ... ... ... ... ...
251 4dacffcdf5b39021d99d31b9b47c75f3 atchit coming late! That\nwas the thing he had... ... [85c79fd84f5e4f918471c386852204c5, 14555b518e9... None
252 3532e5c77e9f1729668da996f4b3cb57 world. Some people laughed to see the alterati... ... [3671ea0dd4e84c1a9b02c5ab2c8f4bac, 38f51478f41... None
253 eeff10c06a799e1f4e2a39c31bc0a03e Bounceable. Denotes a bounceable or non-bounce... ... [f09f381c319f4251847d1a4bb8cdcac1, eec11f567e7... None
254 ebdf376d6b3b608fca6461bc709e5c89 flag typically denotes a custom smart contrac... ... [1c16b22e18d3483b8d41b284754274e2, ac41b77ba33... None
255 94c2433d30e8464317772cf3047b72e3 TL or ProtoBuf for byte-streams.\n ... [718c507cb8ac49e6a35c251ac951b5ca, b45ef27279c... None

[256 rows x 6 columns]
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/datashaper/engine/verbs/convert.py:72: FutureWarning: errors='ignore' is deprecated and will raise in a future version. Use to_datetime without
passing `errors` and catch exceptions explicitly instead
datetime_column = pd.to_datetime(column, errors="ignore")
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/datashaper/engine/verbs/convert.py:72: UserWarning: Could not infer format, so each element will be parsed individually, falling back to
`dateutil`. To ensure parsing is consistent and as-expected, please specify a format.
datetime_column = pd.to_datetime(column, errors="ignore")
🚀 create_base_documents
id text_units raw_content title
0 74072607b83a60b24fac454f324820df [d9ce9fc181d8422550db4b2a84968619, fba274cff7f... Blockchain of Blockchains\nTIP\nTerms 'smart c... ton.txt
1 2a9051b84ce75474d87ac998d9b88fd4 [c2584f52b014c1f09c2d3be292410c05, a138e3deb4f... The Project Gutenberg eBook of A Christmas Car... book.txt
🚀 create_final_documents
id text_unit_ids raw_content title
0 74072607b83a60b24fac454f324820df [d9ce9fc181d8422550db4b2a84968619, fba274cff7f... Blockchain of Blockchains\nTIP\nTerms 'smart c... ton.txt
1 2a9051b84ce75474d87ac998d9b88fd4 [c2584f52b014c1f09c2d3be292410c05, a138e3deb4f... The Project Gutenberg eBook of A Christmas Car... book.txt
⠸ GraphRAG Indexer
├── Loading Input (InputFileType.text) - 2 files loaded (0 filtered) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00 0:00:00
├── create_base_text_units
├── create_base_extracted_entities
├── create_summarized_entities
├── create_base_entity_graph
├── create_final_entities
├── create_final_nodes
├── create_final_communities
├── join_text_units_to_entity_ids
├── create_final_relationships
├── join_text_units_to_relationship_ids
├── create_final_community_reports
├── create_final_text_units
├── create_base_documents
└── create_final_documents
🚀 All workflows completed successfully.

╰─(brown) ⠠⠵ python -m graphrag.query --root . --method global "What are the top themes in this story"

INFO: Reading settings from settings.yaml
creating llm client with {'api_key': 'REDACTED,len=56', 'type': "openai_chat", 'model': 'gpt-4-turbo-preview', 'max_tokens': 4000, 'request_timeout': 180.0, 'api_base': None, 'api_version': None, 'organization': None, 'proxy': None, 'cognitive_services_endpoint': None, 'deployment_name': None, 'model_supports_json': True, 'tokens_per_minute': 0, 'requests_per_minute': 0, 'max_retries': 10, 'max_retry_wait': 10.0, 'sleep_on_rate_limit_recommendation': True, 'concurrent_requests': 25}

SUCCESS: Global Search Response: The story in question deeply explores several interwoven themes, each contributing to the narrative's rich tapestry and the protagonist's transformative journey. Central to these themes are transformation and redemption, the spirit of Christmas, social responsibility, familial bonds, economic disparity, and the role of supernatural guidance.

### Transformation and Redemption

At the heart of the narrative is the profound transformation of Ebenezer Scrooge, evolving from a miser to a figure of generosity. This change is not self-initiated but guided by the spirits and his interactions with other characters, illustrating the transformative power of compassion and redemption [Data: Reports (45, 30, 29, 43, +more)]. Scrooge's journey from miserliness to generosity serves as a central theme, emphasizing the potential for change within everyone, regardless of past actions.

### The Spirit of Christmas

The spirit of Christmas acts as a catalyst for Scrooge's transformation, embodying themes of generosity, family, and goodwill. This spirit impacts not only Scrooge but also the broader community, showcasing the holiday's power to inspire reflection and change in individuals and society at large [Data: Reports (45, 30, 28, 29, 37, +more)].

### Social Responsibility and Economic Disparity

Scrooge's interactions with characters like Bob Cratchit and Tiny Tim highlight the importance of social responsibility and the impact of individual actions on the community. The narrative explores economic disparity and its effects on society through the contrasting lives of Scrooge, his clerk, and the Cratchit family, emphasizing the consequences of Scrooge's initial miserliness and his eventual generosity [Data: Reports (45, 26, 27, 46, +more)].

### Familial Bonds

Family and familial bonds are significant in influencing Scrooge's transformation and underscoring the importance of connections and reconciliation. The resilience and mutual care of the Cratchit family, despite economic hardship, highlight the importance of familial support in overcoming adversity [Data: Reports (35, 30, 26, 27, +more)].

### Supernatural Guidance

The role of supernatural guidance in personal transformation is evident through Scrooge's encounters with Marley's Ghost, The Ghost, and other spirits. These encounters lead to his moral and emotional awakening, illustrating the impact of external moral guidance on personal growth [Data: Reports (43, 44, 45, 23, +more)].

In summary, the story weaves together these themes to create a narrative that not only entertains but also imparts valuable lessons on the importance of compassion, community, and the potential for personal growth and redemption.

╰─(brown) ⠠⠵ python -m graphrag.query --root . --method local "Who is Scrooge, and what are his main relationships?"

INFO: Reading settings from settings.yaml
creating llm client with {'api_key': 'REDACTED,len=56', 'type': "openai_chat", 'model': 'gpt-4-turbo-preview', 'max_tokens': 4000, 'request_timeout': 180.0, 'api_base': None, 'api_version': None, 'organization': None, 'proxy': None, 'cognitive_services_endpoint': None, 'deployment_name': None, 'model_supports_json': True, 'tokens_per_minute': 0, 'requests_per_minute': 0, 'max_retries': 10, 'max_retry_wait': 10.0, 'sleep_on_rate_limit_recommendation': True, 'concurrent_requests': 25}
creating embedding llm client with {'api_key': 'REDACTED,len=56', 'type': "openai_embedding", 'model': 'text-embedding-3-small', 'max_tokens': 4000, 'request_timeout': 180.0, 'api_base': None, 'api_version': None, 'organization': None, 'proxy': None, 'cognitive_services_endpoint': None, 'deployment_name': None, 'model_supports_json': None, 'tokens_per_minute': 0, 'requests_per_minute': 0, 'max_retries': 10, 'max_retry_wait': 10.0, 'sleep_on_rate_limit_recommendation': True, 'concurrent_requests': 25}

SUCCESS: Local Search Response: # Who is Scrooge?

Ebenezer Scrooge is a central character in Charles Dickens' classic novella, "A Christmas Carol." He is initially depicted as a grasping, covetous old man, known for his miserly and unfeeling nature. Scrooge's life is characterized by his extreme dedication to his work and his isolation from society, which earns him a reputation for being odious and stingy. Despite these negative attributes, Scrooge undergoes a significant transformation throughout the story, evolving from a solitary and miserly figure to one who embraces generosity and communal spirit [Data: Entities (148, 20, 32)].

# Main Relationships of Scrooge

## Jacob Marley

Jacob Marley, Scrooge's former business partner, plays a pivotal role in initiating Scrooge's transformation. Marley's ghost visits Scrooge, burdened with heavy chains as a consequence of his greed and selfishness in life, warning Scrooge to change his ways to avoid a similar fate. This visit sets the stage for the subsequent spiritual visitations that catalyze Scrooge's transformation [Data: Entities (84); Relationships (54, 120, 94)].

## The Three Spirits

The Ghosts of Christmas Past, Present, and Yet to Come are instrumental in Scrooge's journey towards redemption. Each spirit reveals to Scrooge the impact of his actions and the potential consequences of his continued indifference, guiding him towards empathy, generosity, and a renewed appreciation for human connections. These interactions are crucial in highlighting the importance of reflection, compassion, and the potential for change [Data: Entities (17, 83, 18); Relationships (40, 43, 46)].

## Bob Cratchit and Tiny Tim

Bob Cratchit, Scrooge's underpaid and overworked clerk, and his son, Tiny Tim, represent the human face of Scrooge's initial indifference. Scrooge's evolving relationship with the Cratchit family, from a figure of dread to a benefactor, signifies his personal growth and highlights the broader theme of social responsibility. This shift underscores the transformative power of kindness and the importance of supporting those in need [Data: Entities (62); Relationships (157, 158, 26)].

## Scrooge's Nephew

Scrooge's nephew, Fred, embodies the spirit of Christmas with his cheerful disposition and unwavering belief in the goodness of the season. Despite Scrooge's initial rejection of Christmas and his nephew's invitations, Fred remains optimistic and persistent. His character represents the joy and optimism of Christmas, and his relationship with Scrooge serves as a testament to the power of family, forgiveness, and the potential for personal growth and redemption [Data: Entities (51, 238); Relationships (221, 193)].

In summary, Ebenezer Scrooge's character is defined by his relationships with Jacob Marley, the Three Spirits, Bob Cratchit and Tiny Tim, and his nephew Fred. These relationships are central to his profound transformation from a miser to a benefactor, illustrating the themes of redemption, compassion, and the enduring spirit of Christmas.

(brown) ╭─brown at kiyoshitaro’s Mac mini (2) in ~/code/personal/tech_training/graphrag on master✘✘✘ 24-07-16 - 12:10:58
╰─(brown) ⠠⠵ python gs.py
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/graphrag/query/indexer_adapters.py:71: SettingWithCopyWarning:
A value is trying to be set on a copy of a slice from a DataFrame.
Try using .loc[row_indexer,col_indexer] = value instead

See the caveats in the documentation: https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html#returning-a-view-versus-a-copy
entity_df["community"] = entity_df["community"].fillna(-1)
/Users/brown/miniconda3/envs/brown/lib/python3.11/site-packages/graphrag/query/indexer_adapters.py:72: SettingWithCopyWarning:
A value is trying to be set on a copy of a slice from a DataFrame.
Try using .loc[row_indexer,col_indexer] = value instead

See the caveats in the documentation: https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html#returning-a-view-versus-a-copy
entity_df["community"] = entity_df["community"].astype(int)
Report records: 47

# VLM Health Future Work Analysis

In reviewing the insights provided by multiple analysts focusing on different aspects of the dataset, several key points emerge regarding potential future work for VLM Health. Analysts have highlighted
various themes and narratives that could inform strategies for promoting well-being and positive behavior change within the organization.

## Insights from Analyst Reports:

### 1. **Narratives and Themes:**

- The reports emphasize narratives related to Christmas, posthumous possessions, maritime communities, and shop interactions. While these themes may not directly relate to VLM Health, they provide a
  backdrop for understanding the importance of community engagement, personal transformation, and empathy.

### 2. **Personal Transformation and Kindness:**

- Analysts suggest that VLM Health may analyze the significance of personal transformation, kindness, and empathy, as exemplified by characters like Scrooge and the Cratchit family. Understanding
  these aspects could help in developing strategies to promote positive behavior change and well-being.

[Data: Reports (0, 3, 8, 14)]

### 3. **Community Engagement Initiatives:**

- There is a recommendation to explore the potential impact of community engagement initiatives on health outcomes. Drawing inspiration from the Fezziwig Festive Community's emphasis on joy and
  generosity could provide insights into fostering a positive environment for health promotion.

[Data: Reports (8)]

### 4. **Role of Transformative Events:**

- Analysts suggest that VLM Health shall evaluate the role of transformative events, such as Christmas Eve in the Fezziwig Festive Community. These events promote reflection, celebration, and
  community spirit, which could be integrated into future health programs for a holistic approach.

[Data: Reports (8)]

## Implications for VLM Health:

Based on the insights provided by the analysts, VLM Health may consider the following strategies for their future work:

1. **Incorporating Themes of Personal Transformation:** VLM Health could focus on promoting personal transformation, kindness, and empathy within their programs to encourage positive behavior change
   among individuals.

2. **Community Engagement for Health Outcomes:** Implementing community engagement initiatives inspired by the joy and generosity of festive communities may enhance the impact of VLM Health's
   interventions on health outcomes.

3. **Utilizing Transformative Events:** By evaluating the role of transformative events like Christmas Eve, VLM Health can design programs that promote reflection, celebration, and community spirit,
   fostering a supportive environment for well-being.

In conclusion, by integrating these insights into their future work, VLM Health may enhance their approach to promoting well-being and positive behavior change within their organization and the
communities they serve.
id title occurrence weight content rank
0 4 The Spirit of Christmas and Scrooge's Transfor... 0.202532 # The Spirit of Christmas and Scrooge's Transf... 8.5
1 11 The Underworld Economy of Posthumous Possessions 0.082278 # The Underworld Economy of Posthumous Possess... 6.5
2 12 Lighthouse and The Sea: A Maritime Chronicle 0.012658 # Lighthouse and The Sea: A Maritime Chronicle... 6.5
3 2 The Shopkeeper's Intriguing Encounters 0.006329 # The Shopkeeper's Intriguing Encounters\n\nTh... 3.5
4 5 The Fireplace and Dutch Merchant: A Cultural R... 0.006329 # The Fireplace and Dutch Merchant: A Cultural... 3.5
5 1 The Transformational Journey of Ebenezer Scrooge 1.000000 # The Transformational Journey of Ebenezer Scr... 8.5
6 9 The Complex Dynamics of 'The Girl' and 'He' 0.012658 # The Complex Dynamics of 'The Girl' and 'He'\... 4.0
7 13 The Ancient Tower and The Church 0.006329 # The Ancient Tower and The Church\n\nThis rep... 4.0
8 10 The Emotional Dynamics of a Family as Seen by ... 0.006329 # The Emotional Dynamics of a Family as Seen b... 3.5
9 15 The Young Girl and The Daughter: A Generationa... 0.006329 # The Young Girl and The Daughter: A Generatio... 3.0
10 3 The Cratchit Family: A Study of Resilience and... 0.278481 # The Cratchit Family: A Study of Resilience a... 7.5
11 0 Project Gutenberg and Its Ecosystem 0.145570 # Project Gutenberg and Its Ecosystem\n\nThis ... 8.5
12 8 The Fezziwig Festive Community 0.113924 # The Fezziwig Festive Community\n\nThe commun... 7.5
13 14 The Spectre and The Star: A Tale of Regret and... 0.006329 # The Spectre and The Star: A Tale of Regret a... 4.0
LLM calls: 4. LLM tokens: 11945
(brown) ╭─brown at kiyoshitaro’s Mac mini (2) in ~/code/personal/tech_training/graphrag on master✘✘✘ 24-07-16 - 12:12:34
╰─(brown) ⠠⠵ python local-search.py
[2024-07-16T05:14:20Z WARN lance::dataset] No existing dataset at /Users/brown/code/personal/tech_training/graphrag/output/20240716-115536/artifacts/lancedb/entity_description_embeddings.lance, it will be created
Future work in the context of the provided data can focus on several key areas. One potential avenue for exploration could involve delving deeper into the intricate network of relationships and
interactions within the TON network, particularly regarding entities like Workchains, Shardchains, and the Ethereum Virtual Machine (EVM) [Data: Entities (282, 283, 284); Relationships (374, 375)].
Understanding how these components interact and contribute to the functionality and adaptability of the blockchain ecosystem could provide valuable insights into optimizing blockchain operations and
enhancing smart contract execution.

Additionally, further investigation into the role of user-friendly addresses and their impact on transaction security and usability within the TON network could be a fruitful area of study [Data: Sources
(215); Relationships (342, 392)]. Exploring the benefits and limitations of user-friendly addresses compared to raw addresses, as well as analyzing the implications of different address states (nonexist,
uninit, active), could offer valuable insights into address management and transaction handling on the blockchain.

Moreover, future research could focus on analyzing the implications of different cell types and flavors within the TON Virtual Machine (TVM), such as Builder, Slice, and Continuation cells, in the
context of cell serialization and data manipulation [Data: Entities (346); Relationships (407, 409, 388)]. Understanding how these specialized cell types contribute to the efficiency and functionality of
the TVM could provide valuable insights into optimizing smart contract execution and data storage on the blockchain.

Overall, future work in the realm of blockchain technology, specifically within the TON network, could benefit from exploring the intricate relationships between entities, the impact of different address
formats, and the functionality of specialized cell types within the TVM. By delving deeper into these areas, researchers and developers can enhance their understanding of blockchain operations and
optimize the performance of smart contracts within the TON ecosystem.
id entity description number of relationships in_context
0 282 "WORKCHAIN" A Workchain within the TON network is a custom... 4 True
1 263 "PERSON YOU RECEIVED THE WORK FROM" "This entity is mentioned as the contact for a... 1 True
2 293 "BASIC WORKCHAIN" "Basic Workchain is another primary workchain ... 1 True
3 264 "ENTITY THAT PROVIDED YOU WITH THE DEFECTIVE W... "This entity is responsible for providing the ... 1 True
4 206 "GHOST OF THE FUTURE" "The Ghost of the Future is a spectral entity ... 1 True
id source target description weight rank links in_context
0 374 "WORKCHAIN" "SHARDCHAINS" Workchain and Shardchains are integral compone... 2.0 6 1 True
1 375 "WORKCHAIN" "EVM" "Workchains can be designed to operate on the ... 1.0 5 1 True
2 328 "PERSON YOU RECEIVED THE WORK FROM" "ENTITY THAT PROVIDED YOU WITH THE DEFECTIVE W... "The person you received the work from may be ... 1.0 2 1 True
3 151 "SCROOGE" "COMELY MATRON" "Scrooge sees the Comely Matron in a vision, s... 1.0 116 5 True
4 46 "GHOST OF CHRISTMAS YET TO COME" "SCROOGE" "Scrooge interacts with the Ghost of Christmas... 1.0 115 5 True
id title content
0 45 The Transformation of Ebenezer Scrooge: A Chri... # The Transformation of Ebenezer Scrooge: A Ch...
id text
0 213 own rules\nIf you want to customize rules of ...
1 212 with each other by sending messages. There is...
2 202 defect in this electronic work within 90 days ...
3 215 's why every actor (i.e., smart contract) on T...
4 141 before us,' Scrooge pursued. 'Is that so,\nSp...
[
'- How does the transformation of Ebenezer Scrooge impact the community?',
"- What role does Christmas play in facilitating Scrooge's personal growth?",
"- How do the Ghosts of Christmas Past, Present, and Yet to Come influence Scrooge's transformation?",
"- What is the significance of Scrooge's evolving relationship with Bob Cratchit and Tiny Tim?",
"- How does Jacob Marley's spectral visitation contribute to Scrooge's journey of personal change?"
]


python -m graphrag.query --root . --method local ""