# push command format: sh push.sh "custom message"
defaultCommitMsg="msg"
commitMsg="$1"
echo "given commit message:" $commitMsg
if [ -z "$commitMsg" ] # if commit message is empty, do the following
then
    commitMsg=$defaultCommitMsg
    echo "no commit message given, going ahead with:" $commitMsg
fi
git add .
git commit -m "$commitMsg"
git pull origin master
git push origin master
