import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const NewsletterForm = () => (
  <form className="mt-11 flex w-full flex-col gap-5 p-11">
    <div className="flex flex-col">
      <label className="mb-1 text-start text-sm font-semibold text-gray-50" htmlFor="email">
        이메일
      </label>
      <Input className="mt-1 h-13 rounded-2xl bg-white" type="email" id="email" name="email" />
    </div>
    <div className="flex items-center gap-2">
      <Checkbox
        id="check"
        className="h-5 w-5 border-gray-50 bg-white text-green-500 data-[state=checked]:border-green-500"
      />
      <label className="text-sm font-semibold text-gray-50" htmlFor="check">
        개인정보 이용 동의
      </label>
    </div>
    <Button variant="submit" size="xl">
      확인
    </Button>
  </form>
);
