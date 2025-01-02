use atelierDB;

-- user data
insert into users (email, password, userType) values ('user1@lgresearch.ai', '1234', 0);
insert into users (email, password, userType) values ('user2@lgresearch.ai', '1234', 0);
insert into users (email, password, userType) values ('user3@lgresearch.ai', '1234', 0);
insert into users (email, password, userType) values ('user4@lgresearch.ai', '1234', 0);
insert into users (email, password, userType) values ('user5@lgresearch.ai', '1234', 0);
insert into users (email, password, userType) values ('user6@lgresearch.ai', '1234', 0);
insert into users (email, password, userType) values ('user7@lgresearch.ai', '1234', 0);
insert into users (email, password, userType) values ('user8@lgresearch.ai', '1234', 0);
insert into users (email, password, userType) values ('user9@lgresearch.ai', '1234', 0);
insert into users (email, password, userType) values ('user10@lgresearch.ai', '1234', 0);
insert into users (email, password, userType) values ('user11@lgresearch.ai', '1234', 1);
insert into users (email, password, userType) values ('user12@lgresearch.ai', '1234', 2);

-- 1차 test case
insert into testCases (title, description, startDate, endDate) values ('1차 테스트', '아뜰리에 AB TEST', '20230801', '20230831');

-- 1차 test users
insert into testers (userId, caseId) 
select userId, 1 as caseId from users where userType = 0;

-- 2차 test case
insert into testCases (title, description, startDate, endDate) values ('2차 테스트', '아뜰리에 AB TEST', '20230901', '20230931');

-- 2차 test users
insert into testers (userId, caseId) 
select userId, 2 as caseId from users where userType = 0 limit 5 offset 3;


-- models
insert into models (name) values ('model-v1');
insert into models (name) values ('model-v2');
insert into models (name) values ('model-v3');
insert into models (name) values ('model-v4');


-- abTestLogs
-- user 1
insert into abTestLogs (userId, promptId, model0, model1, caption, hasLabel, label0, label1, image0uid, image1uid, numExamplePerPrompt) 
values (1, 1, 'model-v1', 'model-v1', 'Nisi ut velit officia occaecat cillum proident aute irure quis culpa. Excepteur esse ullamco minim aute sit exercitation cupidatat ullamco in reprehenderit cillum duis.',  1, 1, 0, 'dc7faa48-fbe4-406b-bd0c-d8a7d9408adb', '19969f52-9906-43e7-b2a0-47542dc42045', 3);

insert into abTestLogs (userId, promptId, model0, model1, caption, hasLabel, label0, label1, image0uid, image1uid, numExamplePerPrompt) 
values (1, 1, 'model-v1', 'model-v2', 'Nisi ut velit officia occaecat cillum proident aute irure quis culpa. Excepteur esse ullamco minim aute sit exercitation cupidatat ullamco in reprehenderit cillum duis.',  1, 1, 0, 'dc7faa48-fbe4-406b-bd0c-d8a7d9408adb','4d8a2c9c-27bb-4698-a08b-eef585436852' , 3);

insert into abTestLogs (userId, promptId, model0, model1, caption, hasLabel, label0, label1, image0uid, image1uid, numExamplePerPrompt) 
values (1, 1, 'model-v1', 'model-v2', 'Nisi ut velit officia occaecat cillum proident aute irure quis culpa. Excepteur esse ullamco minim aute sit exercitation cupidatat ullamco in reprehenderit cillum duis.',  1, 1, 0, 'dc7faa48-fbe4-406b-bd0c-d8a7d9408adb','58922189-50c1-42a2-8875-dc17a395657f' , 3);


insert into abTestLogs (userId, promptId, model0, model1, caption, hasLabel, label0, label1, image0uid, image1uid, numExamplePerPrompt) 
values (1, 2, 'model-v1', 'model-v1', 'Pariatur sunt cillum quis sit occaecat ut labore enim. Commodo tempor dolore aute anim Lorem ipsum labore.',  1, 1, 0, '4d1ec640-fe40-496e-8294-0f8068baa25b', '961a9e85-43be-45f4-8507-843129b835e3', 3);

insert into abTestLogs (userId, promptId, model0, model1, caption, hasLabel, label0, label1, image0uid, image1uid, numExamplePerPrompt) 
values (1, 2, 'model-v1', 'model-v2', 'Pariatur sunt cillum quis sit occaecat ut labore enim. Commodo tempor dolore aute anim Lorem ipsum labore.',  1, 1, 0, '4d1ec640-fe40-496e-8294-0f8068baa25b', 'c1315569-15fd-4c3d-922a-a2685772d959' , 3);

insert into abTestLogs (userId, promptId, model0, model1, caption, hasLabel, label0, label1, image0uid, image1uid, numExamplePerPrompt) 
values (1, 2, 'model-v1', 'model-v2', 'Pariatur sunt cillum quis sit occaecat ut labore enim. Commodo tempor dolore aute anim Lorem ipsum labore.',  1, 1, 0, '4d1ec640-fe40-496e-8294-0f8068baa25b', '529b7f3a-0b68-45be-8d2b-c2f6c1a93c2f' , 3);


-- user 2
insert into abTestLogs (userId, promptId, model0, model1, caption, hasLabel, label0, label1, image0uid, image1uid, numExamplePerPrompt) 
values (2, 1, 'model-v1', 'model-v1', 'Nisi ut velit officia occaecat cillum proident aute irure quis culpa. Excepteur esse ullamco minim aute sit exercitation cupidatat ullamco in reprehenderit cillum duis.',  1, 1, 0, 'dc7faa48-fbe4-406b-bd0c-d8a7d9408adb', '19969f52-9906-43e7-b2a0-47542dc42045', 3);

insert into abTestLogs (userId, promptId, model0, model1, caption, hasLabel, label0, label1, image0uid, image1uid, numExamplePerPrompt) 
values (2, 1, 'model-v1', 'model-v2', 'Nisi ut velit officia occaecat cillum proident aute irure quis culpa. Excepteur esse ullamco minim aute sit exercitation cupidatat ullamco in reprehenderit cillum duis.',  1, 1, 0, 'dc7faa48-fbe4-406b-bd0c-d8a7d9408adb','4d8a2c9c-27bb-4698-a08b-eef585436852' , 3);

insert into abTestLogs (userId, promptId, model0, model1, caption, hasLabel, label0, label1, image0uid, image1uid, numExamplePerPrompt) 
values (2, 1, 'model-v1', 'model-v2', 'Nisi ut velit officia occaecat cillum proident aute irure quis culpa. Excepteur esse ullamco minim aute sit exercitation cupidatat ullamco in reprehenderit cillum duis.',  1, 1, 0, 'dc7faa48-fbe4-406b-bd0c-d8a7d9408adb','58922189-50c1-42a2-8875-dc17a395657f' , 3);


insert into abTestLogs (userId, promptId, model0, model1, caption, hasLabel, label0, label1, image0uid, image1uid, numExamplePerPrompt) 
values (2, 2, 'model-v1', 'model-v1', 'Pariatur sunt cillum quis sit occaecat ut labore enim. Commodo tempor dolore aute anim Lorem ipsum labore.',  1, 1, 0, '4d1ec640-fe40-496e-8294-0f8068baa25b', '961a9e85-43be-45f4-8507-843129b835e3', 3);

insert into abTestLogs (userId, promptId, model0, model1, caption, hasLabel, label0, label1, image0uid, image1uid, numExamplePerPrompt) 
values (2, 2, 'model-v1', 'model-v2', 'Pariatur sunt cillum quis sit occaecat ut labore enim. Commodo tempor dolore aute anim Lorem ipsum labore.',  1, 1, 0, '4d1ec640-fe40-496e-8294-0f8068baa25b', 'c1315569-15fd-4c3d-922a-a2685772d959' , 3);

insert into abTestLogs (userId, promptId, model0, model1, caption, hasLabel, label0, label1, image0uid, image1uid, numExamplePerPrompt) 
values (2, 2, 'model-v1', 'model-v2', 'Pariatur sunt cillum quis sit occaecat ut labore enim. Commodo tempor dolore aute anim Lorem ipsum labore.',  1, 1, 0, '4d1ec640-fe40-496e-8294-0f8068baa25b', '529b7f3a-0b68-45be-8d2b-c2f6c1a93c2f' , 3);


-- abTestDataSets;
insert into abTestDataSets (caseId, fileName, url) values (1, 'EXAONE_VALID_DATA_TESTCASE-2023-08-18-2023-08-28.parquet', 'https://s3.us-west-2.amazonaws.com/lgaivision-exaone-gen/logs/EXAONE_VALID_DATA_TESTCASE-2023-08-18-2023-08-28.parquet');
insert into abTestDataSets (caseId, fileName, url) values (2, 'EXAONE_TEST_DATA_TESTCASE-2023-08-18-2023-08-28.parquet', 'https://s3.us-west-2.amazonaws.com/lgaivision-exaone-gen/logs/EXAONE_TEST_DATA_TESTCASE-2023-08-18-2023-08-28.parquet');
insert into abTestDataSets (caseId, fileName, url) values (3, 'EXAONE_TRAIN_DATA_TESTCASE-2023-08-28.parquet', 'https://s3.us-west-2.amazonaws.com/lgaivision-exaone-gen/logs/EXAONE_TRAIN_DATA_TESTCASE-2023-08-28.parquet');


-- log count
select count(*) as count from testers t
inner join prompts p on t.caseId = p.caseId
inner join abTestLogs a on t.userId = a.userId and p.promptId = a.promptId
where t.userId = 1
and t.caseId = 1;