/* =========================================
   CONSOLOCATE Buildings Seed (FULL)
   - Upsert Buildings by Code
   - Replace Coordinates + Offices
   ========================================= */

SET NOCOUNT ON;
BEGIN TRAN;

-- SA-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'SA-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'St. Augustine Administration Building', Color=N'#0080ff', Title=N'Saint Augustine Administration Building', Description=N'Heart of the university.', ImageUrl=N'/images/main_bldg.jpg'
  WHERE Code=N'SA-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'SA-building', N'St. Augustine Administration Building', N'#0080ff', N'Saint Augustine Administration Building', N'Heart of the university.', N'/images/main_bldg.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'SA-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.8127945241639, 14.85391026664972),
(@bid, 2, 120.81275693338233, 14.853572244530937),
(@bid, 3, 120.81279908062339, 14.853565638230634),
(@bid, 4, 120.8127865503622, 14.853445623731488),
(@bid, 5, 120.81274819424101, 14.853449190420477),
(@bid, 6, 120.81273691238607, 14.853356994699837),
(@bid, 7, 120.81262306821594, 14.85336789957229),
(@bid, 8, 120.81264460630206, 14.853568152581943),
(@bid, 9, 120.8126128119847, 14.853574100687922),
(@bid, 10, 120.8126281963315, 14.853728751395948),
(@bid, 11, 120.81265999065062, 14.853726768694813),
(@bid, 12, 120.81268255435884, 14.853925038673324),
(@bid, 13, 120.81269486183766, 14.853926030022578),
(@bid, 14, 120.81269588745965, 14.853939908914683),
(@bid, 15, 120.812759476096, 14.853935943517143),
(@bid, 16, 120.81275742485013, 14.853915125179114),
(@bid, 17, 120.81279434728299, 14.85391115978112),
(@bid, 18, 120.8127945241639, 14.85391026664972);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Office of the President'),
(@bid, N'Registrar'),
(@bid, N'Finance'),
(@bid, N'HR');

GO

-- barcie-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'barcie-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Barcie International Hotel', Color=N'#ff6600', Title=N'Barcie International Center', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'barcie-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'barcie-building', N'Barcie International Hotel', N'#ff6600', N'Barcie International Center', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'barcie-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81307862595372, 14.85422201708323),
(@bid, 2, 120.81307556164853, 14.854181537787639),
(@bid, 3, 120.81309088317289, 14.854178082237226),
(@bid, 4, 120.81308781886776, 14.854135134682622),
(@bid, 5, 120.81306994375711, 14.854137109283243),
(@bid, 6, 120.81306432586439, 14.854099591873208),
(@bid, 7, 120.81258323001549, 14.85414204578474),
(@bid, 8, 120.81259753010488, 14.854279774114715),
(@bid, 9, 120.81275380964803, 14.854266939220011),
(@bid, 10, 120.81275432036557, 14.854254104324596),
(@bid, 11, 120.81307862595372, 14.85422201708323);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- vmc-open-stage-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'vmc-open-stage-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'VMC Open Stage', Color=N'#ff2200', Title=N'VMC Open Stage', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'vmc-open-stage-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'vmc-open-stage-building', N'VMC Open Stage', N'#ff2200', N'VMC Open Stage', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'vmc-open-stage-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81282284373663, 14.853905478151546),
(@bid, 2, 120.81281391574947, 14.85380808652019),
(@bid, 3, 120.812953574961, 14.853794525656582),
(@bid, 4, 120.81296377837327, 14.853891300892116),
(@bid, 5, 120.81282284373663, 14.853905478151546);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- consuelo-academic-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'consuelo-academic-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Venerable Mo. Consuelo Academic Building', Color=N'#ff2200', Title=N'Venerable Mo. Consuelo Academic Building', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'consuelo-academic-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'consuelo-academic-building', N'Venerable Mo. Consuelo Academic Building', N'#ff2200', N'Venerable Mo. Consuelo Academic Building', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'consuelo-academic-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81297874609902, 14.853897016176205),
(@bid, 2, 120.81309991162618, 14.853886537331007),
(@bid, 3, 120.8130836264072, 14.853681110913584),
(@bid, 4, 120.81314383022129, 14.853674949405487),
(@bid, 5, 120.81313816397926, 14.853581157536382),
(@bid, 6, 120.81309354232889, 14.853581157536382),
(@bid, 7, 120.81308787608697, 14.853534603892399),
(@bid, 8, 120.8130588366073, 14.853535288500055),
(@bid, 9, 120.81303662303492, 14.85332519517452),
(@bid, 10, 120.81292542305016, 14.85333683359815),
(@bid, 11, 120.81298019089576, 14.853897888369545),
(@bid, 12, 120.81297874609902, 14.853897016176205);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- barcie-center-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'barcie-center-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Barcie International Center', Color=N'#ff2200', Title=N'Barcie International Center', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'barcie-center-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'barcie-center-building', N'Barcie International Center', N'#ff2200', N'Barcie International Center', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'barcie-center-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.8125406202845, 14.85411983399456),
(@bid, 2, 120.81257674258336, 14.854146533812127),
(@bid, 3, 120.81258240882511, 14.854187628249122),
(@bid, 4, 120.81250874768813, 14.854268412262584),
(@bid, 5, 120.81242871202892, 14.854202689677692),
(@bid, 6, 120.81232247000406, 14.854203374288105),
(@bid, 7, 120.81229059739638, 14.85391309929932),
(@bid, 8, 120.81250166488564, 14.853890507125811),
(@bid, 9, 120.8125285795333, 14.85413080557683),
(@bid, 10, 120.8125406202958, 14.854118482586117),
(@bid, 11, 120.81256824322196, 14.854141759346447),
(@bid, 12, 120.8125406202845, 14.85411983399456);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- barcie-pool-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'barcie-pool-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Barcie Pool', Color=N'#ff2200', Title=N'Barcie Pool', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'barcie-pool-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'barcie-pool-building', N'Barcie Pool', N'#ff2200', N'Barcie Pool', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'barcie-pool-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81232441122393, 14.854298121540054),
(@bid, 2, 120.81238116770731, 14.854336338427757),
(@bid, 3, 120.81243218477033, 14.854330790815567),
(@bid, 4, 120.8124583310152, 14.854298737941605),
(@bid, 5, 120.81245322930988, 14.854259288243952),
(@bid, 6, 120.81239392197307, 14.854216756530192),
(@bid, 7, 120.81234290491005, 14.854222304145338),
(@bid, 8, 120.81231612095178, 14.854251275023046),
(@bid, 9, 120.81232377351068, 14.854297505138504),
(@bid, 10, 120.81232441122393, 14.854298121540054);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- barcelo-cafe-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'barcelo-cafe-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Barcelo Cafe Malolos', Color=N'#ff2200', Title=N'Barcelo Cafe Malolos', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'barcelo-cafe-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'barcelo-cafe-building', N'Barcelo Cafe Malolos', N'#ff2200', N'Barcelo Cafe Malolos', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'barcelo-cafe-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81229443335621, 14.853903296856586),
(@bid, 2, 120.81228814011189, 14.853754264728323),
(@bid, 3, 120.81235815246896, 14.853748181782393),
(@bid, 4, 120.81242423154708, 14.853799886819843),
(@bid, 5, 120.81240613846603, 14.85382726007009),
(@bid, 6, 120.8124084984334, 14.853837905221198),
(@bid, 7, 120.81239355197539, 14.853849310740841),
(@bid, 8, 120.81240220518708, 14.853861476626818),
(@bid, 9, 120.81236995230375, 14.853871361409318),
(@bid, 10, 120.8123707389596, 14.853897213914834),
(@bid, 11, 120.8122960066678, 14.853903296856586),
(@bid, 12, 120.81229443335621, 14.853903296856586);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- agostino-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'agostino-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Agostino - CITHM Laboratory', Color=N'#ff2200', Title=N'Agostino - CITHM Laboratory', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'agostino-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'agostino-building', N'Agostino - CITHM Laboratory', N'#ff2200', N'Agostino - CITHM Laboratory', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'agostino-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81227251965043, 14.853740251442673),
(@bid, 2, 120.81227251965043, 14.853547117804595),
(@bid, 3, 120.81236849164645, 14.853547117804595),
(@bid, 4, 120.81236849164645, 14.853740251442673),
(@bid, 5, 120.81227251965043, 14.853740251442673);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- andrada-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'andrada-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Mo. Theresa Andrada OSA Gymnasium', Color=N'#ff2200', Title=N'Mo. Theresa Andrada OSA Gymnasium', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'andrada-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'andrada-building', N'Mo. Theresa Andrada OSA Gymnasium', N'#ff2200', N'Mo. Theresa Andrada OSA Gymnasium', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'andrada-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.8131561855543, 14.854303160898624),
(@bid, 2, 120.81310920107569, 14.853994656655203),
(@bid, 3, 120.81330523976527, 14.853964902414944),
(@bid, 4, 120.81335546455313, 14.85427497271256),
(@bid, 5, 120.81315942586355, 14.854306292919517),
(@bid, 6, 120.8131561855543, 14.854303160898624);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
-- (no offices)

GO

-- ezekiel-moreno-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'ezekiel-moreno-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'St. Ezekiel Moreno Building', Color=N'#ff2200', Title=N'St. Ezekiel Moreno Building', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'ezekiel-moreno-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'ezekiel-moreno-building', N'St. Ezekiel Moreno Building', N'#ff2200', N'St. Ezekiel Moreno Building', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'ezekiel-moreno-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81341475050982, 14.854139859237264),
(@bid, 2, 120.81336429051026, 14.85400010376084),
(@bid, 3, 120.81344968435837, 14.853970089150081),
(@bid, 4, 120.81350208512754, 14.854111720558194),
(@bid, 5, 120.81341669127937, 14.854143611061318),
(@bid, 6, 120.81341475050982, 14.854139859237264);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Human Anatomy Laboratory');

GO

-- ostia-student-lounge-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'ostia-student-lounge-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Ostia Student Lounge', Color=N'#ff2200', Title=N'Ostia Student Lounge', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'ostia-student-lounge-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'ostia-student-lounge-building', N'Ostia Student Lounge', N'#ff2200', N'Ostia Student Lounge', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'ostia-student-lounge-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.8135405740909, 14.85393575332111),
(@bid, 2, 120.81350395800217, 14.853902046203999),
(@bid, 3, 120.8135167445729, 14.853848676590871),
(@bid, 4, 120.81356963447939, 14.853834631953376),
(@bid, 5, 120.81360973781506, 14.853872833364818),
(@bid, 6, 120.81359346399734, 14.853921708689981),
(@bid, 7, 120.8135405740909, 14.853936876891737),
(@bid, 8, 120.8135405740909, 14.85393575332111);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
-- (no offices)

GO

-- cafe-monica-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'cafe-monica-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Cafe Monica Building', Color=N'#ff2200', Title=N'Cafe Monica Building', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'cafe-monica-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'cafe-monica-building', N'Cafe Monica Building', N'#ff2200', N'Cafe Monica Building', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'cafe-monica-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81356657633563, 14.853706526009091),
(@bid, 2, 120.81355372886935, 14.853675184963592),
(@bid, 3, 120.81353568123666, 14.85367902867668),
(@bid, 4, 120.81350815095306, 14.853611615847697),
(@bid, 5, 120.81352283377038, 14.853603041407112),
(@bid, 6, 120.8135127393337, 14.853571109005713),
(@bid, 7, 120.81348857389247, 14.853505195305232),
(@bid, 8, 120.81349530351696, 14.853498099213894),
(@bid, 9, 120.81348123248227, 14.853455522656446),
(@bid, 10, 120.81368159177981, 14.853382787685291),
(@bid, 11, 120.81371829882613, 14.853480654652813),
(@bid, 12, 120.81372227589219, 14.853493073181554),
(@bid, 13, 120.81376907737683, 14.853475628620842),
(@bid, 14, 120.81377611289412, 14.853493073181554),
(@bid, 15, 120.81384524988886, 14.853467540019011),
(@bid, 16, 120.81387793580632, 14.853481855916172),
(@bid, 17, 120.81389325732943, 14.853530233766406),
(@bid, 18, 120.81387333934867, 14.853537638539407),
(@bid, 19, 120.8138942787644, 14.853595889404005),
(@bid, 20, 120.81382584262565, 14.853624027527744),
(@bid, 21, 120.81382022473292, 14.853615141804966),
(@bid, 22, 120.813566392334, 14.85370648993053),
(@bid, 23, 120.81356657633563, 14.853706526009091);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'University Bookstore'),
(@bid, N'Cafeteria');

GO

-- olgc-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'olgc-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Our Lady of Good Counsel Building', Color=N'#ff2200', Title=N'Our Lady of Good Counsel Building', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'olgc-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'olgc-building', N'Our Lady of Good Counsel Building', N'#ff2200', N'Our Lady of Good Counsel Building', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'olgc-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81342704920195, 14.853403961975829),
(@bid, 2, 120.8133886192573, 14.853246853438606),
(@bid, 3, 120.81368282883483, 14.853176824402112),
(@bid, 4, 120.81371873878436, 14.853312619816961),
(@bid, 5, 120.81375212873564, 14.853305312442515),
(@bid, 6, 120.81376031872486, 14.853342458259462),
(@bid, 7, 120.81347051913986, 14.85341126934695),
(@bid, 8, 120.81346484914741, 14.85339543670905),
(@bid, 9, 120.81342767920114, 14.853403961975829),
(@bid, 10, 120.81342704920195, 14.853403961975829);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'CITHM Office'),
(@bid, N'CITHM Faculty Room'),
(@bid, N'Function Hall'),
(@bid, N'Bar Area'),
(@bid, N'Hot Kitchen Laboratory'),
(@bid, N'Cold Kitchen Laboratory');

GO

-- canteen-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'canteen-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Mini Canteen', Color=N'#ff2200', Title=N'Mini Canteen', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'canteen-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'canteen-building', N'Mini Canteen', N'#ff2200', N'Mini Canteen', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'canteen-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81337988906557, 14.853525493034752),
(@bid, 2, 120.81334880347413, 14.853499202042784),
(@bid, 3, 120.81335735201287, 14.853467652848607),
(@bid, 4, 120.81339076902395, 14.853457887620706),
(@bid, 5, 120.81342107747548, 14.853474413390472),
(@bid, 6, 120.81341408321651, 14.853511220781783),
(@bid, 7, 120.81337911192765, 14.853526244206009),
(@bid, 8, 120.81337988906557, 14.853525493034752);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
-- (no offices)

GO

-- kalinangan-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'kalinangan-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Kalinangan Auditorium', Color=N'#ff2200', Title=N'Kalinangan Auditorium', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'kalinangan-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'kalinangan-building', N'Kalinangan Auditorium', N'#ff2200', N'Kalinangan Auditorium', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'kalinangan-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81231747083638, 14.853021861563079),
(@bid, 2, 120.81231747083933, 14.853049660005354),
(@bid, 3, 120.81236636179545, 14.853055219691583),
(@bid, 4, 120.81236923773446, 14.853023714799306),
(@bid, 5, 120.8124919444515, 14.853031127715482),
(@bid, 6, 120.8125092000833, 14.852627123396488),
(@bid, 7, 120.81245551589541, 14.852622490314502),
(@bid, 8, 120.81245839183447, 14.852554847314607),
(@bid, 9, 120.81227720769783, 14.852545581148647),
(@bid, 10, 120.81227433175883, 14.852615077384343),
(@bid, 11, 120.81221585433934, 14.852614150767891),
(@bid, 12, 120.81219955735156, 14.853013522038694),
(@bid, 13, 120.81231747083933, 14.853014448652246),
(@bid, 14, 120.81231747083638, 14.853021861563079);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'UBMSS Office');

GO

-- chapel-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'chapel-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Chapel of Our Lady of Consolation', Color=N'#ff2200', Title=N'Chapel of Our Lady of Consolation', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'chapel-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'chapel-building', N'Chapel of Our Lady of Consolation', N'#ff2200', N'Chapel of Our Lady of Consolation', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'chapel-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81295400576028, 14.853081881301861),
(@bid, 2, 120.812919683102, 14.852992520628959),
(@bid, 3, 120.81290695050274, 14.852899414259369),
(@bid, 4, 120.81319481796089, 14.852825571247507),
(@bid, 5, 120.81324464117358, 14.853017670043286),
(@bid, 6, 120.8129816853226, 14.853085091864685),
(@bid, 7, 120.81295400576028, 14.853081346208072),
(@bid, 8, 120.81295400576028, 14.853081881301861);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- mother-rita-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'mother-rita-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Mo. Rita Barcelo Building', Color=N'#ff2200', Title=N'Mo. Rita Barcelo Building', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'mother-rita-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'mother-rita-building', N'Mo. Rita Barcelo Building', N'#ff2200', N'Mo. Rita Barcelo Building', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'mother-rita-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.8135761632119, 14.852711583778557),
(@bid, 2, 120.81363297870723, 14.85293751811362),
(@bid, 3, 120.81341269057145, 14.852995890240763),
(@bid, 4, 120.8133476011497, 14.85277078346762),
(@bid, 5, 120.81357420961587, 14.85271325828451),
(@bid, 6, 120.81376535330452, 14.852489197432064),
(@bid, 7, 120.81323568305766, 14.852617239466454),
(@bid, 8, 120.81325430847517, 14.85271217538434),
(@bid, 9, 120.81322578248728, 14.852721893995792),
(@bid, 10, 120.81332308196107, 14.853085631805854),
(@bid, 11, 120.8133490187933, 14.85308243528172),
(@bid, 12, 120.81337628214317, 14.853175122158902),
(@bid, 13, 120.81391186142491, 14.853045894640289),
(@bid, 14, 120.81386810853041, 14.8528771269159),
(@bid, 15, 120.8138326385029, 14.852890319177476),
(@bid, 16, 120.81380938453435, 14.852813153549135),
(@bid, 17, 120.81384488368082, 14.852803641721238),
(@bid, 18, 120.81383033399487, 14.852731644610103),
(@bid, 19, 120.8137921787843, 14.85273702067586),
(@bid, 20, 120.8137713338113, 14.852662111519237),
(@bid, 21, 120.81380751845757, 14.852651663037136),
(@bid, 22, 120.81376858370317, 14.852489343249914),
(@bid, 23, 120.8135761632119, 14.852711583778557);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- cloister-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'cloister-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Cloister', Color=N'#ff2200', Title=N'Cloister', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'cloister-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'cloister-building', N'Cloister', N'#ff2200', N'Cloister', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'cloister-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81304358142842, 14.852526257822603),
(@bid, 2, 120.81303759271111, 14.852631886860905),
(@bid, 3, 120.81305918042409, 14.852700568206657),
(@bid, 4, 120.81283289481632, 14.852752472131996),
(@bid, 5, 120.81280397176027, 14.85263123577974),
(@bid, 6, 120.81293903275736, 14.852592436227567),
(@bid, 7, 120.81294028440993, 14.852528852596578),
(@bid, 8, 120.81304443617512, 14.852527455451323),
(@bid, 9, 120.81304358142842, 14.852526257822603);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- motor-pool-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'motor-pool-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Motor Pool', Color=N'#ff2200', Title=N'Motor Pool', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'motor-pool-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'motor-pool-building', N'Motor Pool', N'#ff2200', N'Motor Pool', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'motor-pool-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81270145317137, 14.852572674389307),
(@bid, 2, 120.81257888558946, 14.852569365154679),
(@bid, 3, 120.81256792990717, 14.852746351987548),
(@bid, 4, 120.81269636664751, 14.852748690493826),
(@bid, 5, 120.81270255527028, 14.852574962523036),
(@bid, 6, 120.81270145317137, 14.852572674389307);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- olympic-swimming-pool-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'olympic-swimming-pool-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Adeotatus Mini Olympic Swimming Pool', Color=N'#ff2200', Title=N'Adeotatus Mini Olympic Swimming Pool', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'olympic-swimming-pool-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'olympic-swimming-pool-building', N'Adeotatus Mini Olympic Swimming Pool', N'#ff2200', N'Adeotatus Mini Olympic Swimming Pool', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'olympic-swimming-pool-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81277209846053, 14.852201596387175),
(@bid, 2, 120.81275309955402, 14.852520737912954),
(@bid, 3, 120.81246530878082, 14.852507379360091),
(@bid, 4, 120.81248492319554, 14.85218499622998),
(@bid, 5, 120.81277095230024, 14.852203068443856),
(@bid, 6, 120.81277209846053, 14.852201596387175);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- fish-pond-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'fish-pond-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Fish Pond', Color=N'#ff2200', Title=N'Fish Pond', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'fish-pond-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'fish-pond-building', N'Fish Pond', N'#ff2200', N'Fish Pond', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'fish-pond-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.8135642407837, 14.852025456383402),
(@bid, 2, 120.81366016661747, 14.85237422215333),
(@bid, 3, 120.81310611233238, 14.85257372107965),
(@bid, 4, 120.81303508855387, 14.852122273465255),
(@bid, 5, 120.81355796934236, 14.85200867065197),
(@bid, 6, 120.8135687251825, 14.852044537280165),
(@bid, 7, 120.8135642407837, 14.852025456383402);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- padre-pio-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'padre-pio-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'St. Padre Pio Building', Color=N'#ff2200', Title=N'St. Padre Pio Building', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'padre-pio-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'padre-pio-building', N'St. Padre Pio Building', N'#ff2200', N'St. Padre Pio Building', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'padre-pio-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81419694466706, 14.852175006807244),
(@bid, 2, 120.8142724992573, 14.852455304436461),
(@bid, 3, 120.81447133022027, 14.852376617578287),
(@bid, 4, 120.81430020222297, 14.85212998116765),
(@bid, 5, 120.8142696082216, 14.852141305619938),
(@bid, 6, 120.8141917077429, 14.852017695211629),
(@bid, 7, 120.81415812940014, 14.852019545779783),
(@bid, 8, 120.81413871055321, 14.851969037714127),
(@bid, 9, 120.81404118136118, 14.851992386987035),
(@bid, 10, 120.8140115370137, 14.851960416713965),
(@bid, 11, 120.81364088034513, 14.852082177387956),
(@bid, 12, 120.81368308528647, 14.852199158637191),
(@bid, 13, 120.81404188349376, 14.852081959015791),
(@bid, 14, 120.81408441126109, 14.852195275527833),
(@bid, 15, 120.81419726749306, 14.852171342070363),
(@bid, 16, 120.81419694466706, 14.852175006807244);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'St. Padre Pio Canteen');

GO

-- sto-niño-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'sto-niño-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Sto. Niño Building', Color=N'#ff2200', Title=N'Sto. Niño Building', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'sto-niño-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'sto-niño-building', N'Sto. Niño Building', N'#ff2200', N'Sto. Niño Building', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'sto-niño-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.8141715637804, 14.852172467591345),
(@bid, 2, 120.8140365970097, 14.852216018751292),
(@bid, 3, 120.81408402940355, 14.852364293264898),
(@bid, 4, 120.81382515009125, 14.85243109030796),
(@bid, 5, 120.81386007334811, 14.852561837497518),
(@bid, 6, 120.8141269966502, 14.85249438005718),
(@bid, 7, 120.81411904943656, 14.852475574710368),
(@bid, 8, 120.81416093097943, 14.852463521637958),
(@bid, 9, 120.81414669815655, 14.852417160050123),
(@bid, 10, 120.81422615494932, 14.852392985772767),
(@bid, 11, 120.81421361477067, 14.85235666593158),
(@bid, 12, 120.81422641897927, 14.852349891766565),
(@bid, 13, 120.81417226019448, 14.852172591137233),
(@bid, 14, 120.8141715637804, 14.852172467591345);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- sto-grounds-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'sto-grounds-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Sto. Niño Grounds and Sta. Rita de Casia Student Lounge', Color=N'#ff2200', Title=N'Sto. Niño Grounds and Sta. Rita de Casia Student Lounge', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'sto-grounds-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'sto-grounds-building', N'Sto. Niño Grounds and Sta. Rita de Casia Student Lounge', N'#ff2200', N'Sto. Niño Grounds and Sta. Rita de Casia Student Lounge', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'sto-grounds-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81398892826229, 14.852151086463948),
(@bid, 2, 120.81406220296844, 14.852355859164618),
(@bid, 3, 120.81380412316548, 14.85242534562532),
(@bid, 4, 120.81373730967249, 14.852222685191506),
(@bid, 5, 120.81398853957899, 14.852152527339669),
(@bid, 6, 120.81398892826229, 14.852151086463948);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- cassiciacum-builduing
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'cassiciacum-builduing')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Cassiciacum Student Center', Color=N'#ff2200', Title=N'Cassiciacum Student Center', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'cassiciacum-builduing';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'cassiciacum-builduing', N'Cassiciacum Student Center', N'#ff2200', N'Cassiciacum Student Center', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'cassiciacum-builduing');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81451690477371, 14.852688561669567),
(@bid, 2, 120.81427699446874, 14.852471430226942),
(@bid, 3, 120.81409681231287, 14.852669458328762),
(@bid, 4, 120.81433119881359, 14.852889360681843),
(@bid, 5, 120.81451735829995, 14.852687904640305),
(@bid, 6, 120.81451690477371, 14.852688561669567);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- student-lounge-builduing
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'student-lounge-builduing')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Madaura, Milan, and Hippo Student Lounge', Color=N'#ff2200', Title=N'Madaura, Milan, and Hippo Student Lounge', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'student-lounge-builduing';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'student-lounge-builduing', N'Madaura, Milan, and Hippo Student Lounge', N'#ff2200', N'Madaura, Milan, and Hippo Student Lounge', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'student-lounge-builduing');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81433966224563, 14.852939738563478),
(@bid, 2, 120.81417528050548, 14.852796112225448),
(@bid, 3, 120.81405259667554, 14.852953022012912),
(@bid, 4, 120.81418757430527, 14.853082462478355),
(@bid, 5, 120.81433943720168, 14.852938679312416),
(@bid, 6, 120.81433966224563, 14.852939738563478);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- our-lady-grace-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'our-lady-grace-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Our Lady of Grace Building', Color=N'#ff2200', Title=N'Our Lady of Grace Building', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'our-lady-grace-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'our-lady-grace-building', N'Our Lady of Grace Building', N'#ff2200', N'Our Lady of Grace Building', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'our-lady-grace-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81411609751336, 14.853142687633678),
(@bid, 2, 120.81407912673143, 14.85311277038862),
(@bid, 3, 120.81391262827003, 14.85313123752043),
(@bid, 4, 120.81393170958785, 14.8532661464332),
(@bid, 5, 120.81411520895671, 14.853142843351065),
(@bid, 6, 120.81411609751336, 14.853142687633678);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- our-lady-consolation-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'our-lady-consolation-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Our Lady of Consolation Building', Color=N'#ff2200', Title=N'Our Lady of Consolation Building', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'our-lady-consolation-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'our-lady-consolation-building', N'Our Lady of Consolation Building', N'#ff2200', N'Our Lady of Consolation Building', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'our-lady-consolation-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.813902246206, 14.853131267865137),
(@bid, 2, 120.81393005596408, 14.853302719122993),
(@bid, 3, 120.81376571602914, 14.853339272038966),
(@bid, 4, 120.81372655421382, 14.853171328365534),
(@bid, 5, 120.81389929146445, 14.853131001620355),
(@bid, 6, 120.813902246206, 14.853131267865137);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- saint-agustine-garden-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'saint-agustine-garden-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'St. Agustine Inner Garden', Color=N'#00FF00', Title=N'St. Agustine Inner Garden', Description=N'Engineering and Technology Institute.', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'saint-agustine-garden-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'saint-agustine-garden-building', N'St. Agustine Inner Garden', N'#00FF00', N'St. Agustine Inner Garden', N'Engineering and Technology Institute.', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'saint-agustine-garden-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81357312121179, 14.852722081886697),
(@bid, 2, 120.81362160162752, 14.852931002470825),
(@bid, 3, 120.81342139532461, 14.852985241026758),
(@bid, 4, 120.81335772635691, 14.85277779451053),
(@bid, 5, 120.81357106843728, 14.85272015328755),
(@bid, 6, 120.81357312121179, 14.852722081886697);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- carthage-activity-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'carthage-activity-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Carthage Student Activity Hub', Color=N'#00FF00', Title=N'Agustino Farm', Description=N'Carthage Student Activity Hub', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'carthage-activity-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'carthage-activity-building', N'Carthage Student Activity Hub', N'#00FF00', N'Agustino Farm', N'Carthage Student Activity Hub', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'carthage-activity-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81261642212968, 14.853135924777504),
(@bid, 2, 120.81258251376772, 14.853000726414564),
(@bid, 3, 120.81285095496503, 14.852931078740781),
(@bid, 4, 120.81288910187249, 14.853063545866803),
(@bid, 5, 120.81261783497695, 14.853135924777504),
(@bid, 6, 120.81261642212968, 14.853135924777504);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- tagaste-mini-forest-building1
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'tagaste-mini-forest-building1')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Tagaste Mini Forest', Color=N'#00FF00', Title=N'Tagaste Mini Forest', Description=N'Carthage Student Activity Hub', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'tagaste-mini-forest-building1';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'tagaste-mini-forest-building1', N'Tagaste Mini Forest', N'#00FF00', N'Tagaste Mini Forest', N'Carthage Student Activity Hub', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'tagaste-mini-forest-building1');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81327920069845, 14.853066784016036),
(@bid, 2, 120.81320881182808, 14.8531808776264),
(@bid, 3, 120.81268179516417, 14.853238741694952),
(@bid, 4, 120.81263810804637, 14.85314738712475),
(@bid, 5, 120.8132817589738, 14.853066180039178),
(@bid, 6, 120.8129366560758, 14.853110444805168),
(@bid, 7, 120.81327920069845, 14.853066784016036);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- tagaste-mini-forest-building2
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'tagaste-mini-forest-building2')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Tagaste Mini Forest', Color=N'#00FF00', Title=N'Tagaste Mini Forest', Description=N'Carthage Student Activity Hub', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'tagaste-mini-forest-building2';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'tagaste-mini-forest-building2', N'Tagaste Mini Forest', N'#00FF00', N'Tagaste Mini Forest', N'Carthage Student Activity Hub', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'tagaste-mini-forest-building2');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.8125886781176, 14.852985357852688),
(@bid, 2, 120.8125936492869, 14.85283939547054),
(@bid, 3, 120.8127813160549, 14.852785863532361),
(@bid, 4, 120.81279796621976, 14.8528401321215),
(@bid, 5, 120.81286365867288, 14.852818235416947),
(@bid, 6, 120.81288255071041, 14.85290462317738),
(@bid, 7, 120.81258676853133, 14.852986518424828),
(@bid, 8, 120.8125886781176, 14.852985357852688);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- mary-of-mediatrix-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'mary-of-mediatrix-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Mary of Mediatrix', Color=N'#00FF00', Title=N'Mary of Mediatrix', Description=N'Carthage Student Activity Hub', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'mary-of-mediatrix-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'mary-of-mediatrix-building', N'Mary of Mediatrix', N'#00FF00', N'Mary of Mediatrix', N'Carthage Student Activity Hub', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'mary-of-mediatrix-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81179160500346, 14.853112014214489),
(@bid, 2, 120.81154220392858, 14.853075375299213),
(@bid, 3, 120.81152109051317, 14.85318609925207),
(@bid, 4, 120.8118965148401, 14.853251301404939),
(@bid, 5, 120.8119243118507, 14.8530886930577),
(@bid, 6, 120.81179836180382, 14.853068042658094),
(@bid, 7, 120.81179021189337, 14.853112218438582),
(@bid, 8, 120.81179160500346, 14.853112014214489);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- sto-niño-garden-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'sto-niño-garden-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Sto. Niño Garden', Color=N'#00FF00', Title=N'Sto. Niño Garden', Description=N'Carthage Student Activity Hub', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'sto-niño-garden-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'sto-niño-garden-building', N'Sto. Niño Garden', N'#00FF00', N'Sto. Niño Garden', N'Carthage Student Activity Hub', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'sto-niño-garden-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81193010991484, 14.85307426173516),
(@bid, 2, 120.8118198155525, 14.853051530767601),
(@bid, 3, 120.81185921197391, 14.852844542604302),
(@bid, 4, 120.81196532689194, 14.852847510092658),
(@bid, 5, 120.81193010991836, 14.8530742617329),
(@bid, 6, 120.81193010991484, 14.85307426173516);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- grotto-lady-lourdes-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'grotto-lady-lourdes-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Grotto of Our Lady of Lourdes', Color=N'#00FF00', Title=N'Grotto of Our Lady of Lourdes', Description=N'Carthage Student Activity Hub', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'grotto-lady-lourdes-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'grotto-lady-lourdes-building', N'Grotto of Our Lady of Lourdes', N'#00FF00', N'Grotto of Our Lady of Lourdes', N'Carthage Student Activity Hub', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'grotto-lady-lourdes-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81191810758185, 14.85283962927646),
(@bid, 2, 120.8118631499367, 14.852832849082489),
(@bid, 3, 120.81186576828236, 14.852775940762797),
(@bid, 4, 120.8119253207704, 14.852784239246745),
(@bid, 5, 120.81192055396735, 14.852838686929672),
(@bid, 6, 120.81191810758185, 14.85283962927646);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- villa-sta-monica-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'villa-sta-monica-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Villa Santa Monica Building', Color=N'#00FF00', Title=N'Villa Santa Monica Building', Description=N'Carthage Student Activity Hub', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'villa-sta-monica-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'villa-sta-monica-building', N'Villa Santa Monica Building', N'#00FF00', N'Villa Santa Monica Building', N'Carthage Student Activity Hub', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'villa-sta-monica-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81184329502565, 14.852817426859886),
(@bid, 2, 120.81176888378354, 14.852803343196939),
(@bid, 3, 120.81180290905706, 14.852590203206887),
(@bid, 4, 120.81171334113543, 14.85257373732641),
(@bid, 5, 120.81171820724705, 14.852518155249157),
(@bid, 6, 120.81170237357168, 14.852510005414132),
(@bid, 7, 120.81171201497824, 14.852467380886623),
(@bid, 8, 120.811728245886, 14.852470993408701),
(@bid, 9, 120.811734032429, 14.852458899756385),
(@bid, 10, 120.81176337086663, 14.852461299516833),
(@bid, 11, 120.8117716667748, 14.85247454505398),
(@bid, 12, 120.81190847412228, 14.852491447572433),
(@bid, 13, 120.81184671633036, 14.852818849157458),
(@bid, 14, 120.81184329502565, 14.852817426859886);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- rotonda-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'rotonda-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'Our Lady of Consolacion Rotonda', Color=N'#00FF00', Title=N'Our Lady of Consolacion Rotonda', Description=N'Carthage Student Activity Hub', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'rotonda-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'rotonda-building', N'Our Lady of Consolacion Rotonda', N'#00FF00', N'Our Lady of Consolacion Rotonda', N'Carthage Student Activity Hub', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'rotonda-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81241899984633, 14.853300680038284),
(@bid, 2, 120.81240772734328, 14.853300144759903),
(@bid, 3, 120.81239656340078, 14.853298544079792),
(@bid, 4, 120.81238561553386, 14.853295893413394),
(@bid, 5, 120.81237498917655, 14.85329221828812),
(@bid, 6, 120.81236478666666, 14.853287554097479),
(@bid, 7, 120.81235510626004, 14.853281945760253),
(@bid, 8, 120.81234604118437, 14.853275447287851),
(@bid, 9, 120.81233767874134, 14.853268121264202),
(@bid, 10, 120.81233009946585, 14.853260038242995),
(@bid, 11, 120.81232337635046, 14.85325127606822),
(@bid, 12, 120.81231757414241, 14.853241919124486),
(@bid, 13, 120.81231274872002, 14.85323205752436),
(@bid, 14, 120.81230894655468, 14.853221786240494),
(@bid, 15, 120.81230620426317, 14.85321120419102),
(@bid, 16, 120.8123045482551, 14.853200413286897),
(@bid, 17, 120.8123039944786, 14.853189517450456),
(@bid, 18, 120.81230454826667, 14.853178621614566),
(@bid, 19, 120.8123062042858, 14.85316783071207),
(@bid, 20, 120.81230894658756, 14.853157248665237),
(@bid, 21, 120.81231274876188, 14.853146977384926),
(@bid, 22, 120.8123175741916, 14.853137115789135),
(@bid, 23, 120.81232337640515, 14.853127758850347),
(@bid, 24, 120.8123300995239, 14.853118996680939),
(@bid, 25, 120.81233767880052, 14.85311091366531),
(@bid, 26, 120.81234604124242, 14.853103587647238),
(@bid, 27, 120.81235510631471, 14.853097089180203),
(@bid, 28, 120.81236478671588, 14.853091480847919),
(@bid, 29, 120.8123749892184, 14.853086816661614),
(@bid, 30, 120.81238561556673, 14.853083141539896),
(@bid, 31, 120.81239656342343, 14.85308049087614),
(@bid, 32, 120.81240772735484, 14.853078890197654),
(@bid, 33, 120.81241899984633, 14.853078354919827),
(@bid, 34, 120.81243027233782, 14.853078890197654),
(@bid, 35, 120.81244143626922, 14.85308049087614),
(@bid, 36, 120.81245238412593, 14.853083141539896),
(@bid, 37, 120.81246301047427, 14.853086816661614),
(@bid, 38, 120.8124732129768, 14.853091480847919),
(@bid, 39, 120.81248289337795, 14.853097089180203),
(@bid, 40, 120.81249195845025, 14.853103587647238),
(@bid, 41, 120.81250032089216, 14.85311091366531),
(@bid, 42, 120.81250790016875, 14.853118996680939),
(@bid, 43, 120.8125146232875, 14.853127758850347),
(@bid, 44, 120.81252042550105, 14.853137115789135),
(@bid, 45, 120.81252525093078, 14.853146977384926),
(@bid, 46, 120.81252905310511, 14.853157248665237),
(@bid, 47, 120.81253179540685, 14.85316783071207),
(@bid, 48, 120.812533451426, 14.853178621614566),
(@bid, 49, 120.81253400521406, 14.853189517450456),
(@bid, 50, 120.81253345143756, 14.853200413286897),
(@bid, 51, 120.81253179542949, 14.85321120419102),
(@bid, 52, 120.81252905313798, 14.853221786240494),
(@bid, 53, 120.81252525097263, 14.85323205752436),
(@bid, 54, 120.81252042555026, 14.853241919124486),
(@bid, 55, 120.81251462334218, 14.85325127606822),
(@bid, 56, 120.8125079002268, 14.853260038242995),
(@bid, 57, 120.8125003209513, 14.853268121264202),
(@bid, 58, 120.81249195850829, 14.853275447287851),
(@bid, 59, 120.81248289343263, 14.853281945760253),
(@bid, 60, 120.81247321302598, 14.853287554097479),
(@bid, 61, 120.81246301051613, 14.85329221828812),
(@bid, 62, 120.8124523841588, 14.853295893413394),
(@bid, 63, 120.81244143629189, 14.853298544079792),
(@bid, 64, 120.81243027234939, 14.853300144759903),
(@bid, 65, 120.81241899984633, 14.853300680038284);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

-- fabrication-area-building
IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = N'fabrication-area-building')
BEGIN
  UPDATE dbo.Buildings
  SET Name=N'UBMSS Fabrication Area', Color=N'#00FF00', Title=N'UBMSS Fabrication Area', Description=N'Carthage Student Activity Hub', ImageUrl=N'/images/eti_building.jpg'
  WHERE Code=N'fabrication-area-building';
END
ELSE
BEGIN
  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)
  VALUES (N'fabrication-area-building', N'UBMSS Fabrication Area', N'#00FF00', N'UBMSS Fabrication Area', N'Carthage Student Activity Hub', N'/images/eti_building.jpg');
END

DECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=N'fabrication-area-building');
DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES
(@bid, 1, 120.81200337297793, 14.852451490707168),
(@bid, 2, 120.81183421431786, 14.852407967225872),
(@bid, 3, 120.81188336236409, 14.852227011486107),
(@bid, 4, 120.81204608951504, 14.852269241272793),
(@bid, 5, 120.81200375662513, 14.852453754498157),
(@bid, 6, 120.81200337297793, 14.852451490707168);

DELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;
INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES
(@bid, N'Engineering Labs'),
(@bid, N'IT Offices'),
(@bid, N'Lecture Rooms');

GO

COMMIT;
